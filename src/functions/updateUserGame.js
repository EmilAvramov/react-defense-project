import { addDoc, collection, doc } from 'firebase/firestore';

import { db } from '../config/firebase-config';

const updateUserGame = (unique, imageUrl, name) => {
	// Setup ref for target collection and document
	const collectionRef = collection(db, 'games', unique, 'screenshots');
	const docRef = doc(collection(db, 'games', unique, 'screenshots'));

	const updateScreenshots = async () => {
		await addDoc(collectionRef, {
			url: imageUrl,
			id: docRef.path.split('/')[3],
			name,
		});
	};

	updateScreenshots();
};

export default updateUserGame;
