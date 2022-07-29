import { useState } from 'react';
import { useEffect } from 'react';

import { db } from '../config/firebase-config';
import { collection, getDocs, query, where } from 'firebase/firestore';

const useCheckExistsInternal = (data, user) => {
	// Set state, get id and set collection target
	const [error, setError] = useState('');
	const [docRef, setDocRef] = useState('');
	const [exists, setExists] = useState(false);
	const [checkLoading, setCheckLoading] = useState(false)
	const [trigger, setTrigger] = useState(false)
	const { id } = data;

	// Handle change
	const handleTrigger = () => {
		setTrigger(state => !state)
	}

	// Compile firebase query, get docRef if available and set states
	useEffect(() => {
		const checkIfExists = async () => {
			try {
				setCheckLoading(true)
				const collectionRef = collection(db, 'games');
				
				const q = query(collectionRef, where('user', '==', user.uid));
				const snapshot = await getDocs(q);
				snapshot.forEach((doc) => {
					if (doc.data().id === id) {
						setExists(true);
						setDocRef(doc.id);
					}
				});
				setCheckLoading(false)
			} catch (err) {
				setError(err);
				setCheckLoading(false)
			}
		};
		checkIfExists();
	}, [id, user, trigger]);
	return { exists, docRef, error, checkLoading, handleTrigger };
};

export default useCheckExistsInternal;
