import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase-config';
import sendPasswordReset from '../../auth/passwordReset'

import Err from '../helpers/Error';
import Loader from '../helpers/GridLoader';
import styles from '../../styles/components/Auth.module.scss';

const Reset = () => {
	// Manage input data
	const [email, setEmail] = useState('');

	// Manage auth and redirect
	const [user, loading, error] = useAuthState(auth);
	const navigate = useNavigate();

	useEffect(() => {
		if (user) navigate('/');
	}, [user, navigate]);

	return (
		<>
			{error ? (
				<Err error={error} />
			) : loading ? (
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
};
export default Reset;
