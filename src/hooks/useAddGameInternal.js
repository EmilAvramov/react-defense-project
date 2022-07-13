import { useState } from 'react';
import { db } from '../config/firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import useCheckExistsInternal from './useCheckExistsInternal';
import { useEffect } from 'react';

const useAddGameInternal = (data) => {
	const { currentUser } = useAuth();
	const collectionRef = collection(db, 'games');
	const [msg, setMsg] = useState('')

	const addGame = async () => {
		await addDoc(collectionRef, {
			...data,
			urls: data.urls.flat(1).join(', '),
			user: currentUser.uid,
		});
	};
	const validate = useCheckExistsInternal(data, currentUser.uid)
	console.log('requested')

	useEffect(() => {
		validate.exists ? setMsg('Game already exists in your library') : setMsg('OK')
	}, [validate])

	return { addGame, msg };
};

export default useAddGameInternal;
