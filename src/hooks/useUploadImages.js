import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import updateUserGame from '../functions/updateUserGame';
import { useLibrary } from '../contexts/LibraryContext';
import { storage } from '../config/firebase-config';

const useUploadImages = () => {
	// Get change handler and set state
	const { setChanged } = useLibrary();
	const [uploadError, setUploadError] = useState();
	const [loading, setLoading] = useState(false);

	// Run image upload
	const upload = async (file, doc, uid) => {
		setLoading(true);
		const storageRef = ref(
			storage,
			`/screenshots/${uid + file.name}`
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
