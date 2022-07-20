import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';

import { db } from '../config/firebase-config';

const useGetGameScreenshots = (unique) => {
	// Setup state
	const [screenshots, setScreenshots] = useState([]);
	const [loading, setLoading] = useState(false);
	const [fetchError, setFetchError] = useState();
	const [request, setRequest] = useState(false)

	// Setup request handler
	const handleRequest = () => setRequest(state => !state)

	// Rerun request on docRef change or request triggered
	useEffect(() => {
		const getScreenshots = async () => {
			try {
				setLoading(true);
				const docRef = collection(db, 'games', unique, 'screenshots');
				const request = await getDocs(docRef);
				let imageUrls = request.docs.map((doc) => {
					let item = { ...doc.data() };
					item.doc = doc.id;
					return item;
				});
				setScreenshots(imageUrls);
				setLoading(false);
			} catch (err) {
				setFetchError(err);
				setLoading(false);
			}
		};
		getScreenshots();
	}, [unique, request]);

	return { screenshots, loading, fetchError, handleRequest };
};

export default useGetGameScreenshots;
