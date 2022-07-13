import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
	auth,
	logInWithEmailAndPassword,
	signInWithGoogle,
} from '../../services/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import Err from '../helpers/Error';
import Loader from '../helpers/GridLoader';
import styles from '../../styles/components/Auth.module.scss';

const Login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [user, loading, error] = useAuthState(auth);
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

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
				<div className={styles['login']}>
					<div className={styles['login__container']}>
						<input
							type='text'
							className={styles['login__textBox']}
							name='email'
							value={formData.email}
							onChange={handleChange}
							placeholder='E-mail Address'
						/>
						<input
							type='password'
							className={styles['login__textBox']}
							name='password'
							value={formData.password}
							onChange={handleChange}
							placeholder='Password'
						/>
						<button
							className={styles['login__btn']}
							onClick={() => logInWithEmailAndPassword(formData)}
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
