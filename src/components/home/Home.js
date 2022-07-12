import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db, logout } from '../../services/firebase';
import { query, collection, getDocs, where } from 'firebase/firestore';

import Loader from '../helpers/GridLoader';
import styles from '../../styles/components/Home.module.scss';

const Home = () => {
	const [user, loading, error] = useAuthState(auth);
	const [name, setName] = useState('');
	const navigate = useNavigate();
	console.log(error);

	useEffect(() => {
		if (!user) return navigate('/');
		const fetchUserName = async () => {
			try {
				const q = query(
					collection(db, 'users'),
					where('uid', '==', user?.uid)
				);
				const doc = await getDocs(q);
				const data = doc.docs[0].data();
				setName(data.name);
			} catch (err) {
				console.error(err);
				alert('An error occured while fetching user data');
			}
		};
		fetchUserName();
	}, [user, navigate]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<div className={styles['dashboard']}>
					<div className={styles['dashboard__container']}>
						Logged in as
						<div>{name}</div>
						<div>{user?.email}</div>
						<button className={styles['dashboard__btn']} onClick={logout}>
							Logout
						</button>
					</div>
				</div>
			)}
		</>
	);
};
export default Home;
