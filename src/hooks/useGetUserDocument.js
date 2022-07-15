import { useEffect, useState } from 'react';

import { query, where, collection, getDocs } from 'firebase/firestore';

import { useAuth } from '../contexts/AuthContext';
import { db } from '../config/firebase-config';

const useGetUserDocument = () => {
	const [loading, setLoading] = useState(false)
	const [unique, setUnique] = useState('');
	const [fetchError, setFetchError] = useState('');
	const { currentUser } = useAuth();

	useEffect(() => {
		setLoading(true)
		try {
			const collectionRef = collection(db, 'users');
			const q = query(collectionRef, where('uid', '==', currentUser.uid));
			const findUser = async () => {
				const snapshot = await getDocs(q);
				setUnique(snapshot.docs[0].id);
			};
            findUser();
		} catch (err) {
			setFetchError(err);
		}
		setLoading(false)
	}, [unique, currentUser.uid]);

    return { unique, fetchError, loading }
};

export default useGetUserDocument;