import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useOutletContext } from 'react-router-dom';

import updateUserPassword from '../../auth/updatePassword';

import Err from '../helpers/Error';
import styles from '../../styles/components/Profile.module.scss';

const ProfileSettingsPassword = () => {
	// Setup react hooks
	const { navigate } = useOutletContext();
	const [updateError, setUpdateError] = useState('');

	// Manage form data
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		mode: 'onBlur',
		reValidateMode: 'onChange',
		shouldFocusError: true,
	});

	// Submit data for processing
	const submitData = (data) => {
		try {
			updateUserPassword(data.password);
			alert('Password Successfully Updated');
			setTimeout(navigate('/'), 3000);
		} catch (err) {
			setUpdateError(err);
		}
	};

	return (
		<div className={styles['edit__wrapper']}>
			{updateError ? (
				<Err error={updateError} styles={styles['edit__wrapper']} />
			) : (
				<form
					onSubmit={handleSubmit(submitData)}
					className={styles['edit__form']}
				>
					<label
						htmlFor='name'
						className={styles['edit__label_name']}
					>
						New Password
					</label>
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
						className={styles['edit__input_name']}
					/>
					{errors.password && (
						<p className={styles['edit__error1']}>
							{errors.password.message}
						</p>
					)}
					<label htmlFor='age' className={styles['edit__label_age']}>
						Repeat Password
					</label>
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
						className={styles['edit__input_age']}
					/>
					{errors.rePass && (
						<p className={styles['edit__error2']}>
							{errors.rePass.message}
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

export default ProfileSettingsPassword;
