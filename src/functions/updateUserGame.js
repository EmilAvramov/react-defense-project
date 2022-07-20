import { addDoc, collection, doc } from 'firebase/firestore';

import { db } from '../config/firebase-config';

const updateUserGame = (docRef, imageUrl, name) => {
	// Setup ref for target collection and document
	const collectionRef = collection(db, 'games', docRef, 'screenshots');
	const gameRef = doc(collection(db, 'games', docRef, 'screenshots'));

	// Run update
	const updateScreenshots = async () => {
		await addDoc(collectionRef, {
			url: imageUrl,
			id: gameRef.path.split('/')[3],
			name,
		});
	};

	updateScreenshots();
};

export default updateUserGame;
