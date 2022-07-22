import { collection, getDocs } from 'firebase/firestore';
import { ref, list } from 'firebase/storage';
import { useEffect, useState } from 'react';

import { storage } from '../config/firebase-config';
import { db } from '../config/firebase-config';

const useGetAllData = (user) => {
	const [gamesCount, setGamesCount] = useState(null);
	const [userCount, setUserCount] = useState(null);
	const [screenshotCount, setScreenshotCount] = useState(null);
	const [dataLoading, setDataLoading] = useState(false);
	const [dataError, setDataError] = useState();

	const gamesRef = collection(db, 'games');
	const storageRef = ref(storage, 'screenshots');
	const usersRef = collection(db, 'users');

	useEffect(() => {
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
			if (
				gamesCount !== null &&
				userCount !== null &&
				screenshotCount !== null
			) {
				setDataLoading(false);
			}
		} else {
			setGamesCount(null);
			setUserCount(null);
			setScreenshotCount(null);
		}
	}, [
		user,
		gamesCount,
		gamesRef,
		screenshotCount,
		storageRef,
		userCount,
		usersRef,
	]);

	return { gamesCount, userCount, screenshotCount, dataLoading, dataError };
};

export default useGetAllData;
