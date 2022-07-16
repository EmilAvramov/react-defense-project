import { useState } from 'react';

import { storage } from '../config/firebase-config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const useUploadImages = () => {
	const [uploadError, setUploadError] = useState();
	const [percent, setPercent] = useState();
	const [url, setUrl] = useState();

    const upload = (file) => {
        const storageRef = ref(storage, `/screenshots/${file.name}`);
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

	return { upload, uploadError, percent, url };
};

export default useUploadImages;
