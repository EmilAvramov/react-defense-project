import { useState } from 'react';

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import updateUserGame from '../functions/updateUserGame';
import { useLibrary } from '../contexts/LibraryContext';
import { useAuth } from '../contexts/AuthContext';
import { storage } from '../config/firebase-config';

const useUploadImages = ({ doc }) => {
	const { setChanged } = useLibrary();
	const { currentUser } = useAuth();

	const [uploadError, setUploadError] = useState();
	const [loading, setLoading] = useState(false);

	const upload = async (file, doc) => {
		setLoading(true);
		const storageRef = ref(
			storage,
			`/screenshots/${currentUser.uid + file.name}`
		);
		const uploadTask = uploadBytesResumable(storageRef, file);
		uploadTask.on(
			null,
			null,
			(err) => setUploadError(err), 
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((url) => {
					updateUserGame(doc, url, file.name);
					setLoading(false);
					setChanged((state) => !state);
				});
			}
		);
	};

	return { upload, uploadError, loading };
};

export default useUploadImages;
