import { db } from '../config/firebase-config';
import { collection, addDoc } from 'firebase/firestore';

const addGameInternal = (data, currentUser) => {
	const collectionRef = collection(db, 'games');

	const addGame = async () => {
		if (currentUser) {
			await addDoc(collectionRef, {
				...data,
				urls: data.urls.flat(1).join(', '),
				user: currentUser.uid,
			});
		}
	};

	return { addGame };
};

export default addGameInternal;
