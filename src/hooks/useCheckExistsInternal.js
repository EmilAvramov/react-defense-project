import { useState } from 'react';
import { db } from '../config/firebase-config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect } from 'react';

const useCheckExistsInternal = (data, uid) => {
	const [exists, setExists] = useState(false);
	const { id } = data;
	const collectionRef = collection(db, 'games');

	useEffect(() => {
		const getUserGames = async () => {
			const q = query(collectionRef, where('user', '==', uid));
			const collection = await getDocs(q);
			collection.forEach(doc => {
                if (doc.data().id === id) {
                    setExists(true)
                }
            })
		};
		getUserGames();
	}, [collectionRef, id, uid]);
	return { exists };
};

export default useCheckExistsInternal;
