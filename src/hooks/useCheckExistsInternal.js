import { useState } from 'react';
import { useEffect } from 'react';

import { db } from '../config/firebase-config';
import { collection, getDocs, query, where } from 'firebase/firestore';

const useCheckExistsInternal = (data, user) => {
	// Set state, get id and set collection target
	const [error, setError] = useState('');
	const [docRef, setDocRef] = useState('');
	const [exists, setExists] = useState(false);
	const { id } = data;
	const collectionRef = collection(db, 'games');

	// Compile firebase query, get docRef if available and set states
	useEffect(() => {
		const checkIfExists = async () => {
			try {
				const q = query(collectionRef, where('user', '==', user.uid));
				const collection = await getDocs(q);
				collection.forEach((doc) => {
					if (doc.data().id === id) {
						setExists(true);
						setDocRef(doc.id);
					}
				});
			} catch (err) {
				setError(err);
			}
		};
		checkIfExists();
	}, [collectionRef, id, user]);
	return { exists, docRef, error };
};

export default useCheckExistsInternal;
