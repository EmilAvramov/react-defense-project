import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';

import { db } from '../config/firebase-config';

const useGetAllGames = (currentUser) => {
	const [gamesData, setGamesData] = useState([]);
	const [fetchError, setFetchError] = useState();
	const [fetchLoading, setFetchLoading] = useState(false);

	useEffect(() => {
		if (currentUser) {
			try {
				const collectionRef = collection(db, 'games');
				const downloadData = async () => {
					setFetchLoading(true);
					const snapshot = await getDocs(collectionRef);
					let games = snapshot.docs.map((doc) => {
						let item = { ...doc.data() };
						item.doc = doc.id;
						return item;
					});
					setGamesData(games);
					setFetchLoading(false);
				};
				downloadData();
			} catch (err) {
				setFetchError(err);
				setFetchLoading(false);
			}
		}
	}, [currentUser]);

	return { gamesData, fetchLoading, fetchError };
};

export default useGetAllGames;
