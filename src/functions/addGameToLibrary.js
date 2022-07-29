import { collection, addDoc } from 'firebase/firestore';

import { db } from '../config/firebase-config';

const addGameToLibrary = () => {
	// Setup ref to collection
	const collectionRef = collection(db, 'games');

	// Create function to add game to library
	const addGame = async (data, currentUser) => {
		try {
			await addDoc(collectionRef, {
				...data,
				urls: data.urls.flat(1).join(', '),
				user: currentUser.uid,
			});
		} catch (err) {
			alert(err.message);
		}
	};

	return { addGame };
};

export default addGameToLibrary;
