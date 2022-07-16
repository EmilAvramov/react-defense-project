import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase-config';
import signInWithGoogle from '../../auth/googleLogin';
import registerWithEmailAndPassword from '../../auth/regularRegister';

import Err from '../helpers/Error';
import Loader from '../helpers/GridLoader';
import styles from '../../styles/components/Auth.module.scss';

const Register = () => {
	// Manage form data
	const {
		register,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onBlur',
		reValidateMode: 'onChange',
		shouldFocusError: true,
	});

	const pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

	// Manage auth and redirect
	const [user, loading, error] = useAuthState(auth);
	const navigate = useNavigate();

	useEffect(() => {
		if (user) navigate('/');
	}, [user, navigate]);

	// Send register request
	const submitData = (data) => {
		registerWithEmailAndPassword(data);
	};

	return (
		<>
			{error ? (
				<Err error={error} />
			) : loading ? (
				<Loader />
			) : (
				<div className={styles['register__container']}>
					<form
						onSubmit={handleSubmit(submitData)}
						className={styles['register__form']}
					>
						<input
							{...register('name', {
								required: {
									value: true,
									message: 'Field is required',
								},
							})}
							type='text'
							className={styles['register__textBox']}
							placeholder='Full Name'
						/>
						{errors.name && (
							<p className={styles['register__error']}>
								{errors.name.message}
							</p>
						)}
						<input
							{...register('email', {
								required: {
									value: true,
									message: 'Field is required',
								},
								validate: (value) =>
									pattern.test(value) ||
									'Invalid email address',
							})}
							type='text'
							className={styles['register__textBox']}
							placeholder='E-mail Address'
						/>
						{errors.email && (
							<p className={styles['register__error']}>
								{errors.email.message}
							</p>
						)}
						<input
							{...register('password', {
								required: {
									value: true,
									message: 'Field is required',
								},
								minLength: {
									value: 8,
									message:
										'Password must be at least 8 characters',
								},
							})}
							type='password'
							className={styles['register__textBox']}
							placeholder='Password'
						/>
						{errors.password && (
							<p className={styles['register__error']}>
								{errors.password.message}
							</p>
						)}
						<input
							{...register('rePass', {
								required: {
									value: true,
									message: 'Field is required',
								},
								minLength: {
									value: 8,
									message:
										'Password must be at least 8 characters',
								},
								validate: (value) =>
									value === watch('password') ||
									"Passwords don't match",
							})}
							type='password'
							className={styles['register__textBox']}
							placeholder='Confirm Password'
						/>
						{errors.rePass && (
							<p className={styles['register__error']}>
								{errors.rePass.message}
							</p>
						)}
						<button className={styles['register__btn']}>
							Register
						</button>
						<button
							className={`${styles['register__btn']} ${styles['register__google']}`}
							onClick={(e) => {
								e.preventDefault();
								signInWithGoogle();
							}}
						>
							Register with Google
						</button>
						<div>
							Already have an account?{' '}
							<Link to='/login'>Login</Link> now.
						</div>
					</form>
				</div>
			)}
		</>
	);
};
export default Register;
