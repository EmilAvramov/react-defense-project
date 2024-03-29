import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuthState } from 'react-firebase-hooks/auth';

import { useAuth } from '../../contexts/AuthContext';
import { auth } from '../../config/firebase-config';
import sendPasswordReset from '../../auth/passwordReset';

import Err from '../helpers/Error';
import Loader from '../helpers/GridLoader';
import styles from '../../styles/components/Auth.module.scss';

const Reset = () => {
	// Manage form data and handlers
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onSubmit',
		reValidateMode: 'onSubmit',
		shouldFocusError: true,
	});

	const submitData = (data) => {
		sendPasswordReset(data.email);
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
				<Err error={error} styles={styles['reset__container']} />
			) : (
				<div className={styles['reset__container']}>
					<form
						onSubmit={handleSubmit(submitData)}
						className={styles['reset__form']}
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
							className={
								errors.email
									? styles['reset__textBox_error']
									: styles['reset__textBox']
							}
							placeholder='E-mail Address'
						/>
						{errors.email && (
							<p className={styles['reset__error']}>
								{errors.email.message}
							</p>
						)}
						<button className={styles['reset__btn']}>
							Send password reset email
						</button>
						<div>
							Don't have an account?{' '}
							<Link
								to='/register'
								className={styles['reset__link']}
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
export default Reset;
