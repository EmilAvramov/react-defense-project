import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuthState } from 'react-firebase-hooks/auth';

import { useAuth } from '../../contexts/AuthContext';
import { auth } from '../../config/firebase-config';
import signInWithGoogle from '../../auth/googleLogin';
import logInWithEmailAndPassword from '../../auth/regularLogin';

import Err from '../helpers/Error';
import Loader from '../helpers/GridLoader';
import styles from '../../styles/components/Auth.module.scss';

const Login = () => {
	// Manage form data
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onBlur',
		reValidateMode: 'onChange',
		shouldFocusError: true,
	});

	const onSubmit = (data) => {
		logInWithEmailAndPassword(data);
	};

	const pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

	// Manage auth and redirect
	const { currentUser } = useAuth();
	const [loading, error] = useAuthState(auth);
	const navigate = useNavigate();

	useEffect(() => {
		if (currentUser) {
			navigate('/');
		}
	}, [currentUser, navigate]);

	return (
		<>
			{loading ? (
				<Loader loading={loading} />
			) : error ? (
				<Err error={error} styles={styles['login__container']} />
			) : (
				<div className={styles['login__container']}>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className={styles['login__form']}
					>
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
							className={styles['login__textBox']}
							placeholder='E-mail Address'
						/>
						{errors.email && (
							<p className={styles['login__error']}>
								{errors.email.message}
							</p>
						)}
						<input
							{...register('password', {
								required: {
									value: true,
									message: 'Field is required',
								},
							})}
							type='password'
							className={styles['login__textBox']}
							placeholder='Password'
						/>
						{errors.password && (
							<p className={styles['login__error']}>
								{errors.password.message}
							</p>
						)}
						<button className={styles['login__btn']}>Login</button>
						<button
							className={`${styles['login__btn']} ${styles['login__google']}`}
							onClick={(e) => {
								e.preventDefault();
								signInWithGoogle();
							}}
						>
							Login with Google
						</button>
						<div>
							<Link to='/reset' className={styles['login__link']}>
								Forgot Password
							</Link>
						</div>
						<div>
							Don't have an account?{' '}
							<Link
								to='/register'
								className={styles['login__link']}
							>
								Register
							</Link>{' '}
							now.
						</div>
					</form>
				</div>
			)}
		</>
	);
};

export default Login;
