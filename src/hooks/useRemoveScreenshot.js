import { ref, deleteObject } from 'firebase/storage';
import { doc, deleteDoc } from 'firebase/firestore';

import { useAuth } from '../contexts/AuthContext';
import { storage } from '../config/firebase-config';
import { db } from '../config/firebase-config';

const useRemoveScreenshot = (gameRef, subRef, name) => {
	const { currentUser } = useAuth();

	const removeScreenshot = async () => {
		if (currentUser) {
			const screenshot = doc(db, 'games', gameRef, 'screenshots', subRef);
			const storageRef = ref(storage, `screenshots/${name}`);
			try {
				await deleteDoc(screenshot);
				await deleteObject(storageRef);
			} catch (err) {
				alert(err.message);
			}
		}
	};

	return { removeScreenshot };
};

export default useRemoveScreenshot;
