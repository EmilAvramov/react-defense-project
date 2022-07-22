import { useEffect, useState } from 'react';
import { query, where, collection, getDocs } from 'firebase/firestore';

import { useAuth } from '../contexts/AuthContext';
import { db } from '../config/firebase-config';

const useGetUserDocument = () => {
	// Setup state
	const [userLoading, setuserLoading] = useState(false);
	const [unique, setUnique] = useState('');
	const [fetchError, setFetchError] = useState('');
	const { currentUser } = useAuth();

	// Run request on user doc or uid change
	useEffect(() => {
		try {
			const collectionRef = collection(db, 'users');
			const q = query(collectionRef, where('uid', '==', currentUser.uid));
			const findUser = async () => {
				setuserLoading(true);
				const snapshot = await getDocs(q);
				setUnique(snapshot.docs[0].id);
				setuserLoading(false);
			};
			findUser();
		} catch (err) {
			setFetchError(err);
			setuserLoading(false);
		}
	}, [unique, currentUser.uid]);

	return { unique, fetchError, userLoading };
};

export default useGetUserDocument;
