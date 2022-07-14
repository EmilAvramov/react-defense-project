import { useState, useEffect } from 'react';

import { db } from '../config/firebase-config';
import { collection, getDocs, query, where } from 'firebase/firestore';

const useGetAllUserGames = (uid) => {
	const [trigger, setTrigger] = useState(false)
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();

	const handleRequest = () => {
		setTrigger(state => !state)
	}

	useEffect(() => {
		setLoading(true);
		try {
			const collectionRef = collection(db, 'games');
			const q = query(collectionRef, where('user', '==', uid));
			const getData = async () => {
				const snapshot = await getDocs(q);
				let games = snapshot.docs.map(doc => {
					let item = {...doc.data()}
					item.doc = doc.id
					return item
				})
				setData(games);
			};
            getData();
		} catch (err) {
			setError(err);
		}
		setLoading(false);
	}, [uid, trigger]);

	return { data, loading, error, handleRequest };
};

export default useGetAllUserGames;
