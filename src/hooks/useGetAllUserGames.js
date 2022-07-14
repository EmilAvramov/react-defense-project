import { useState, useEffect } from 'react';

import { db } from '../config/firebase-config';
import { collection, getDocs, query, where } from 'firebase/firestore';

const useGetAllUserGames = (uid) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();

	useEffect(() => {
		setLoading(true);
		try {
			const collectionRef = collection(db, 'games');
			const q = query(collectionRef, where('user', '==', uid));
			const getData = async () => {
				const snapshot = await getDocs(q);
				let games = snapshot.docs.map(doc => ({...doc.data()}))
				setData(games);
			};
            getData();
		} catch (err) {
			setError(err);
		}
		setLoading(false);
	}, [uid]);

	return { data, loading, error };
};

export default useGetAllUserGames;
