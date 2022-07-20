import { db } from '../config/firebase-config';
import { doc, deleteDoc } from 'firebase/firestore';

const delGameFromLibrary = (docRef, user) => {

	// Create function to remove game from library
	const removeGame = async () => {
		if (user) {
			const game = doc(db, 'games', docRef);
			try {
				await deleteDoc(game);
			} catch (err) {
				alert(err.message)
			}
		}
	};

	return { removeGame };
};

export default delGameFromLibrary;
