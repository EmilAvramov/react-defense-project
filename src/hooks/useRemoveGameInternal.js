import { db } from '../config/firebase-config';
import { doc, deleteDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

const useRemoveGameInternal = (ref) => {
	const { currentUser } = useAuth();

	const removeGame = async () => {
		if (currentUser) {
			const game = doc(db, 'games', ref);
			try {
				await deleteDoc(game);
			} catch (err) {
				console.log(err);
			}
		}
	};

	return { removeGame };
};

export default useRemoveGameInternal;
