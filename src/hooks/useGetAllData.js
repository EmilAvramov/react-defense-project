import { collection, getDocs } from 'firebase/firestore';
import { ref, list } from 'firebase/storage';
import { useEffect, useState } from 'react';

import { storage } from '../config/firebase-config';
import { db } from '../config/firebase-config';

const useGetAllData = (currentUser) => {
	// Set states
	const [gamesData, setGamesData] = useState(null);
	const [gamesCount, setGamesCount] = useState(null);
	const [userCount, setUserCount] = useState(null);
	const [screenshotCount, setScreenshotCount] = useState(null);
	const [dataLoading, setDataLoading] = useState(false);
	const [dataError, setDataError] = useState();

	useEffect(() => {
		// If user is present, request data
		if (currentUser) {
			// Set references to different endpoints
			const gamesRef = collection(db, 'games');
			const storageRef = ref(storage, 'screenshots');
			const usersRef = collection(db, 'users');
			// Start request
			setDataLoading(true);
			getDocs(gamesRef)
				.then((res) => {
					setGamesCount(res.docs.length);
					setGamesData(
						res.docs.map((doc) => {
							let item = { ...doc.data() };
							item.doc = doc.id;
							return item;
						})
					);
				})
				.catch((err) => setDataError(err));
			list(storageRef)
				.then((res) => setScreenshotCount(res.items.length))
				.catch((err) => setDataError(err));
			getDocs(usersRef)
				.then((res) => {
					setUserCount(res.docs.length);
				})
				.catch((err) => setDataError(err));
			setDataLoading(false);
		} else {
			// If user logs out, change states to prevent firebase errors
			setGamesData(null);
			setGamesCount(null);
			setUserCount(null);
			setScreenshotCount(null);
			setDataLoading(false);
		}
	}, [currentUser]);

	return {
		gamesData,
		gamesCount,
		userCount,
		screenshotCount,
		dataLoading,
		dataError,
	};
};

export default useGetAllData;
