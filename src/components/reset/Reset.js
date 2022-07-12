import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, sendPasswordReset } from '../../services/firebase';

import Loader from '../helpers/GridLoader';
import styles from '../../styles/components/Auth.module.scss';

const Reset = () => {
	const [email, setEmail] = useState('');
	const [user, loading, error] = useAuthState(auth);
	const navigate = useNavigate();
	console.log(error);

	useEffect(() => {
		if (user) navigate('/');
	}, [user, navigate]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<div className={styles['reset']}>
					<div className={styles['reset__container']}>
						<input
							type='text'
							className={styles['reset__textBox']}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder='E-mail Address'
						/>
						<button
							className={styles['reset__btn']}
							onClick={() => sendPasswordReset(email)}
						>
							Send password reset email
						</button>
						<div>
							Don't have an account?{' '}
							<Link to='/register'>Register</Link> now.
						</div>
					</div>
				</div>
			)}
		</>
	);
}
export default Reset;
