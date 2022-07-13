import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase-config';
import signInWithGoogle from '../../auth/googleLogin';
import registerWithEmailAndPassword from '../../auth/regularRegister';

import Err from '../helpers/Error';
import Loader from '../helpers/GridLoader';
import styles from '../../styles/components/Auth.module.scss';

const Register = () => {
	// Manage form data
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		name: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	// Manage auth and redirect
	const [user, loading, error] = useAuthState(auth);
	const navigate = useNavigate();

	useEffect(() => {
		if (user) navigate('/');
	}, [user, navigate]);

	// Send register request
	const register = () => {
		if (!formData.name) alert('Please enter name');
		registerWithEmailAndPassword(formData);
	};

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
