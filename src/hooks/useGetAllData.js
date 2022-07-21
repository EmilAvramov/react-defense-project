import { collection, getDocs } from 'firebase/firestore';
import { ref, list } from 'firebase/storage';
import { useEffect, useState } from 'react';

import { storage } from '../config/firebase-config';
import { db } from '../config/firebase-config';

const useGetAllData = () => {
	const [gamesCount, setGamesCount] = useState();
	const [userCount, setUserCount] = useState();
	const [screenshotCount, setScreenshotCount] = useState();
	const [dataLoading, setDataLoading] = useState(false);
	const [dataError, setDataError] = useState();

	const gamesRef = collection(db, 'games');
	const storageRef = ref(storage, 'screenshots');
	const usersRef = collection(db, 'users');

	useEffect(() => {
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
		if (gamesCount && userCount && screenshotCount) {
			setDataLoading(false);
		}
	}, [
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
