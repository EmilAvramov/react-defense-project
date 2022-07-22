import { collection, getDocs } from 'firebase/firestore';
import { ref, list } from 'firebase/storage';
import { useEffect, useState } from 'react';

import { storage } from '../config/firebase-config';
import { db } from '../config/firebase-config';

const useGetAllData = (user) => {
	// Set states
	const [gamesCount, setGamesCount] = useState(null);
	const [userCount, setUserCount] = useState(null);
	const [screenshotCount, setScreenshotCount] = useState(null);
	const [dataLoading, setDataLoading] = useState(false);
	const [dataError, setDataError] = useState();

	// Set references to different endpoints
	const gamesRef = collection(db, 'games');
	const storageRef = ref(storage, 'screenshots');
	const usersRef = collection(db, 'users');

	useEffect(() => {
		// If user is present, request data
		if (user) {
			setDataLoading(true);
			getDocs(gamesRef)
				.then((res) => setGamesCount(res.docs.length))
				.catch((err) => setDataError(err));
			list(storageRef)
				.then((res) => setScreenshotCount(res.items.length))
				.catch((err) => setDataError(err));
			getDocs(usersRef)
				.then((res) => {
					setUserCount(res.docs.length);
				})
				.catch((err) => setDataError(err));
			// If all requests are finished, change loading
			if (
				gamesCount !== null &&
				userCount !== null &&
				screenshotCount !== null
			) {
				setDataLoading(false);
			}
		// If user logs out, change states to prevent firebase errors
		} else {
			setGamesCount(null);
			setUserCount(null);
			setScreenshotCount(null);
		}
	}, [
		gamesCount,
		gamesRef,
		screenshotCount,
		storageRef,
		user,
		userCount,
		usersRef,
	]);

	return { gamesCount, userCount, screenshotCount, dataLoading, dataError };
};

export default useGetAllData;
