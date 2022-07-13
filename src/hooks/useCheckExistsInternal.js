import { useState } from 'react';
import { db } from '../config/firebase-config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect } from 'react';

const useCheckExistsInternal = (data, user) => {
	const [error, setError] = useState('');
	const [docRef, setDocRef] = useState('');
	const [exists, setExists] = useState(false);
	const { id } = data;
	const collectionRef = collection(db, 'games');

	useEffect(() => {
		const getUserGames = async () => {
			try {
				if (user) {
					const q = query(
						collectionRef,
						where('user', '==', user.uid)
					);
					const collection = await getDocs(q);
					collection.forEach((doc) => {
						if (doc.data().id === id) {
							setExists(true);
							setDocRef(doc.id);
						}
					});
				} else {
					setError('User is not logged in')
				}
			} catch (err) {
				setError(err);
			}
		};
		getUserGames();
	}, [collectionRef, id, user]);
	return { exists, docRef, error };
};

export default useCheckExistsInternal;
