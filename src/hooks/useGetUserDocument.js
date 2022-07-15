import { useEffect, useState } from 'react';

import { query, where, collection, getDocs } from 'firebase/firestore';

import { useAuth } from '../contexts/AuthContext';
import { db } from '../config/firebase-config';

const useGetUserDocument = () => {
	const [unique, setUnique] = useState('');
	const [error, setError] = useState('');
	const { currentUser } = useAuth();

	useEffect(() => {
		try {
			const collectionRef = collection(db, 'users');
			const q = query(collectionRef, where('uid', '==', currentUser.uid));
			const findUser = async () => {
				const snapshot = await getDocs(q);
				setUnique(snapshot.docs[0].id);
			};
            findUser();
		} catch (err) {
			setError(err);
		}
	}, [unique, currentUser.uid]);

    return { unique, error }
};

export default useGetUserDocument;