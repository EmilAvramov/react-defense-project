import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { auth } from '../../config/firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';

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
							<Link to='/reset'>Forgot Password</Link>
						</div>
						<div>
							Don't have an account?{' '}
							<Link to='/register'>Register</Link> now.
						</div>
					</form>
				</div>
			)}
		</>
	);
};

export default Login;
