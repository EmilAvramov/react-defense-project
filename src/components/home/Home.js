import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { db } from '../../config/firebase-config';
import { query, collection, getDocs, where } from 'firebase/firestore';

import logout from '../../auth/logout';
import { useAuth } from '../../contexts/AuthContext';

import styles from '../../styles/components/Home.module.scss';

const Home = () => {
	const { currentUser } = useAuth();
	const [name, setName] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		if (!currentUser) return navigate('/');
		const fetchUserName = async () => {
			try {
				const q = query(
					collection(db, 'users'),
					where('uid', '==', currentUser.uid)
				);
				const doc = await getDocs(q);
				const data = doc.docs[0].data();
				setName(data.name);
			} catch (err) {
				alert('An error occured while fetching user data');
			}
		};
		fetchUserName();
	}, [currentUser, navigate]);

	return (
		<div className={styles['dashboard']}>
			<div className={styles['dashboard__container']}>
				Logged in as
				{currentUser ? (
					<>
						<div>{name}</div>
						<div>{currentUser.email}</div>
						<button
							className={styles['dashboard__btn']}
							onClick={logout}
						>
							Logout
						</button>
					</>
				) : (
					<div>Guest</div>
				)}
			</div>
		</div>
	);
};
export default Home;
