import { useState } from 'react';

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import { useAuth } from '../contexts/AuthContext';
import { storage } from '../config/firebase-config';

const useUploadImages = () => {
	const { currentUser } = useAuth();
	const [uploadError, setUploadError] = useState();
	const [percent, setPercent] = useState();
	const [url, setUrl] = useState();
	const [name, setName] = useState();

	const upload = (file) => {
		const storageRef = ref(storage, `/screenshots/${currentUser.uid + file.name}`);
        setName(currentUser.uid + file.name);
		const uploadTask = uploadBytesResumable(storageRef, file);
		uploadTask.on(
			'state_changed',
			(snapshot) => {
				const percent =
					Math.round(
						snapshot.bytesTransferred / snapshot.totalBytes
					) * 100;
				setPercent(percent);
			},
			(err) => setUploadError(err),
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((url) =>
					setUrl(url)
				);
			}
		);
	};

	return { upload, uploadError, percent, url, name };
};

export default useUploadImages;
