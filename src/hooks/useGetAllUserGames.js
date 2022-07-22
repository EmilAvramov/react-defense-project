import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';

import { db } from '../config/firebase-config';

const useGetAllUserGames = (uid) => {
	// Setup state
	const [trigger, setTrigger] = useState(false);
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();

	// Setup request handler
	const handleRequest = () => {
		setTrigger((state) => !state);
	};

	//Rerun data request when request handler or uid change
	useEffect(() => {
		try {
			const collectionRef = collection(db, 'games');
			const q = query(collectionRef, where('user', '==', uid));
			const getData = async () => {
				setLoading(true);
				const snapshot = await getDocs(q);
				let games = snapshot.docs.map((doc) => {
					let item = { ...doc.data() };
					item.doc = doc.id;
					return item;
				});
				setData(games);
				setLoading(false);
			};
			getData();
		} catch (err) {
			setError(err);
			setLoading(false);
		}
	}, [uid, trigger]);

	return { data, loading, error, handleRequest };
};

export default useGetAllUserGames;
