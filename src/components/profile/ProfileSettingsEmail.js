import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import updateUserData from '../../functions/updateUserData';
import useGetUserDocument from '../../hooks/useGetUserDocument';
import updateUserEmail from '../../auth/updateEmail';
import { useAuth } from '../../contexts/AuthContext';

import Err from '../helpers/Error';
import Loader from '../helpers/GridLoader';
import styles from '../../styles/components/Profile.module.scss';

const ProfileSettingsEmail = () => {
	// Setup react hooks
	const { currentUser } = useAuth();
	const navigate = useNavigate();
	const [updateError, setUpdateError] = useState('');
	const { unique, fetchError, loading } = useGetUserDocument();

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

	// Pattern for checking email validitiy
	const pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

	// Submit data for processing
	const submitData = (data) => {
		try {
			updateUserEmail(data.email);
			updateUserData({ email: data.email }, unique);
			alert('Email Successfully Updated');
			setTimeout(navigate('/'), 3000);
		} catch (err) {
			setUpdateError(err);
		}
	};

	return loading ? (
		<Loader loading={loading}/>
	) : fetchError ? (
		<Err error={fetchError} />
	) : (
		<div className={styles['edit__wrapper']}>
			{updateError && <p>{updateError.message}</p>}
			<form
				onSubmit={handleSubmit(submitData)}
				className={styles['edit__form']}
			>
				<label htmlFor='name' className={styles['edit__label_name']}>
					New Email
				</label>
				<input
					{...register('email', {
						required: { value: true, message: 'Field is required' },
						validate: (value) => {
							if (value === currentUser.email) {
								return 'This is your current email'
							}
							if (!pattern.test(value)) {
								return 'Invalid email address'
							}
						}
					})}
					type='email'
					className={styles['edit__input_name']}
				/>
				{errors.email && (
					<p className={styles['edit__error1']}>
						{errors.email.message}
					</p>
				)}
				<label htmlFor='age' className={styles['edit__label_age']}>
					Repeat New Email
				</label>
				<input
					{...register('emailRe', {
						required: { value: true, message: 'Field is required' },
						validate: (value) =>
							value === watch('email') || "Emails don't match",
					})}
					type='email'
					className={styles['edit__input_age']}
				/>
				{errors.emailRe && (
					<p className={styles['edit__error2']}>
						{errors.emailRe.message}
					</p>
				)}
				<button className={styles['edit__submit']}>
					Submit Changes
				</button>
			</form>
		</div>
	);
};

export default ProfileSettingsEmail;
