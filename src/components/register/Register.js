import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuthState } from 'react-firebase-hooks/auth';
import {
	auth,
	registerWithEmailAndPassword,
	signInWithGoogle,
} from '../../services/firebase';

import Err from '../helpers/Error';
import Loader from '../helpers/GridLoader';
import styles from '../../styles/components/Auth.module.scss';

const Register = () => {
	const [user, loading, error] = useAuthState(auth);
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		email: '',
		password: '',
		name: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const register = () => {
		if (!formData.name) alert('Please enter name');
		registerWithEmailAndPassword(formData);
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
				<div className={styles['register']}>
					<div className={styles['register__container']}>
						<input
							type='text'
							className={styles['register__textBox']}
							name='name'
							value={formData.name}
							onChange={handleChange}
							placeholder='Full Name'
						/>
						<input
							type='text'
							className={styles['register__textBox']}
							name='email'
							value={formData.email}
							onChange={handleChange}
							placeholder='E-mail Address'
						/>
						<input
							type='password'
							className={styles['register__textBox']}
							name='password'
							value={formData.password}
							onChange={handleChange}
							placeholder='Password'
						/>
						<button
							className={styles['register__btn']}
							onClick={register}
						>
							Register
						</button>
						<button
							className={`${styles['register__btn']} ${styles['register__google']}`}
							onClick={signInWithGoogle}
						>
							Register with Google
						</button>
						<div>
							Already have an account?{' '}
							<Link to='/login'>Login</Link> now.
						</div>
					</div>
				</div>
			)}
		</>
	);
};
export default Register;
