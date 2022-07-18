import { addDoc, collection, doc } from 'firebase/firestore';

import { db } from '../config/firebase-config';

const updateUserGame = (unique, imageUrl) => {
	const docRef = collection(db, 'games', unique, 'screenshots');
	const docId = doc(collection(db, 'games', unique, 'screenshots'))

	const updateScreenshots = async () => {
		await addDoc(docRef, { url: imageUrl, id: docId.path.split('/')[3]})
	}

	updateScreenshots()
};

export default updateUserGame;
