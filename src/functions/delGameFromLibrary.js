import { db } from '../config/firebase-config';
import { doc, deleteDoc } from 'firebase/firestore';

const delGameFromLibrary = () => {
	// Create function to remove game from library
	const removeGame = async (docRef) => {
		const game = doc(db, 'games', docRef);
		try {
			await deleteDoc(game);
		} catch (err) {
			alert(err.message);
		}
	};

	return { removeGame };
};

export default delGameFromLibrary;
