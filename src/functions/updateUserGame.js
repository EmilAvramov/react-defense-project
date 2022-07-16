import { addDoc, collection } from 'firebase/firestore';

import { db } from '../config/firebase-config';

const updateUserGame = (unique, imageUrl) => {
	const docRef = collection(db, 'games', unique, 'screenshots');

	const updateScreenshots = async () => {
		await addDoc(docRef, { imageUrl })
	}

	updateScreenshots()
};

export default updateUserGame;
