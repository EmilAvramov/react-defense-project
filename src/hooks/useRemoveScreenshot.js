import { ref, deleteObject } from 'firebase/storage';
import { doc, deleteDoc } from 'firebase/firestore';

import { useLibrary } from '../contexts/LibraryContext'
import { useAuth } from '../contexts/AuthContext';
import { db, storage } from '../config/firebase-config';

const useRemoveScreenshot = (gameRef, subRef, name) => {
	// Get user and change trigger context
	const { currentUser } = useAuth();
	const { setChanged } = useLibrary();

	// Run delete request for storage and db and flip change handler
	const removeScreenshot = async () => {
		if (currentUser) {
			const screenshot = doc(db, 'games', gameRef, 'screenshots', subRef);
			const storageRef = ref(storage, `screenshots/${currentUser.uid + name}`);
			try {
				await deleteDoc(screenshot);
				await deleteObject(storageRef);
			} catch (err) {
				alert(err.message);
			}
		}
		setChanged((state) => !state)
	};

	return { removeScreenshot };
};

export default useRemoveScreenshot;
