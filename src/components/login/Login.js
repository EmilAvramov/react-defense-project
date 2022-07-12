import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
	auth,
	logInWithEmailAndPassword,
	signInWithGoogle,
} from '../../services/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import Loader from '../helpers/GridLoader';
import styles from '../../styles/components/Auth.module.scss';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [user, loading, error] = useAuthState(auth);
	const navigate = useNavigate();
    console.log(error)

	useEffect(() => {
		if (user) navigate('/');
	}, [user, navigate]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<div className={styles['login']}>
					<div className={styles['login__container']}>
						<input
							type='text'
							className={styles['login__textBox']}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder='E-mail Address'
						/>
						<input
							type='password'
							className={styles['login__textBox']}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder='Password'
						/>
						<button
							className={styles['login__btn']}
							onClick={() =>
								logInWithEmailAndPassword(email, password)
							}
						>
							Login
						</button>
						<button
							className={`${styles['login__btn']} ${styles['login__google']}`}
							onClick={signInWithGoogle}
						>
							Login with Google
						</button>
						<div>
							<Link to='/reset'>Forgot Password</Link>
						</div>
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

export default Login;
