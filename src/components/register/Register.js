import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuthState } from 'react-firebase-hooks/auth';
import {
	auth,
	registerWithEmailAndPassword,
	signInWithGoogle,
} from '../../services/firebase';

import Loader from '../helpers/GridLoader';
import styles from '../../styles/components/Auth.module.scss';

const Register = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [user, loading, error] = useAuthState(auth);
	const navigate = useNavigate();
	console.log(error);

	const register = () => {
		if (!name) alert('Please enter name');
		registerWithEmailAndPassword(name, email, password);
	};

	useEffect(() => {
		if (user) navigate('/');
	}, [user, navigate]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<div className={styles['register']}>
					<div className={styles['register__container']}>
						<input
							type='text'
							className={styles['register__textBox']}
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder='Full Name'
						/>
						<input
							type='text'
							className={styles['register__textBox']}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder='E-mail Address'
						/>
						<input
							type='password'
							className={styles['register__textBox']}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder='Password'
						/>
						<button className={styles['register__btn']} onClick={register}>
							Register
						</button>
						<button
							className={`${styles['register__btn']} ${styles['register__google']}`}
							onClick={signInWithGoogle}
						>
							Register with Google
						</button>
						<div>
							Already have an account? <Link to='/'>Login</Link>{' '}
							now.
						</div>
					</div>
				</div>
			)}
		</>
	);
};
export default Register;
