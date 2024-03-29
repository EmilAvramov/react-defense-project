import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useOutletContext } from 'react-router-dom';

import updateUserData from '../../functions/updateUserData';
import updateUserEmail from '../../auth/updateEmail';

import Err from '../helpers/Error';
import Loader from '../helpers/GridLoader';
import styles from '../../styles/components/Profile.module.scss';
import { settingsLoader } from '../../styles/auxilary/loaderStyles';

const ProfileSettingsEmail = () => {
	// Setup react hooks
	const [updateError, setUpdateError] = useState('');
	const { unique, fetchError, userLoading, navigate, currentUser } =
		useOutletContext();

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

	return userLoading ? (
		<Loader loading={userLoading} styles={settingsLoader} size={40} />
	) : fetchError ? (
		<Err error={fetchError} styles={styles['edit__wrapper']} />
	) : (
		<div className={styles['edit__wrapper']}>
			{updateError ? (
				<Err error={updateError} styles={styles['edit__wrapper']} />
			) : (
				<form
					onSubmit={handleSubmit(submitData)}
					className={styles['edit__form']}
				>
					<label htmlFor='email' className={styles['edit__label1']}>
						New Email
					</label>
					<input
						{...register('email', {
							required: {
								value: true,
								message: 'Field is required',
							},
							validate: (value) => {
								if (value === currentUser.email) {
									return 'This is your current email';
								}
								if (!pattern.test(value)) {
									return 'Invalid email address';
								}
							},
						})}
						type='email'
						className={
							errors.email
								? styles['edit__input_border1']
								: styles['edit__input1']
						}
						id='email'
					/>
					{errors.email && (
						<p className={styles['edit__error1']}>
							{errors.email.message}
						</p>
					)}
					<label htmlFor='emailRe' className={styles['edit__label2']}>
						Repeat New Email
					</label>
					<input
						{...register('emailRe', {
							required: {
								value: true,
								message: 'Field is required',
							},
							validate: (value) =>
								value === watch('email') ||
								"Emails don't match",
						})}
						type='email'
						className={
							errors.emailRe
								? styles['edit__input_border2']
								: styles['edit__input2']
						}
						id='emailRe'
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
			)}
		</div>
	);
};

export default ProfileSettingsEmail;
