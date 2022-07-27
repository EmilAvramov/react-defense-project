import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useOutletContext } from 'react-router-dom';

import updateUserData from '../../functions/updateUserData';

import Err from '../helpers/Error';
import Loader from '../helpers/GridLoader';
import styles from '../../styles/components/Profile.module.scss';
import { settingsLoader } from '../../styles/auxilary/loaderStyles';

const ProfileSettingsEdit = () => {
	// Handle hooks and retrieve user document ref
	const [updateError, setUpdateError] = useState('');
	const { unique, fetchError, userLoading } = useOutletContext();

	// Manage form data
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		mode: 'onBlur',
		reValidateMode: 'onChange',
		shouldFocusError: true,
	});

	// Form handlers

	const submitData = (data) => {
		try {
			updateUserData(data, unique);
			reset();
			alert('Profile information successfully updated');
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
					<label htmlFor='name' className={styles['edit__label1']}>
						Name
					</label>
					<input
						{...register('name', {
							required: {
								value: true,
								message: 'Field is required',
							},
						})}
						type='text'
						className={styles['edit__input1']}
					/>
					{errors.name && (
						<p className={styles['edit__error1']}>
							{errors.name.message}
						</p>
					)}
					<label htmlFor='age' className={styles['edit__label2']}>
						Age
					</label>
					<input
						{...register('age', {
							required: {
								value: true,
								message: 'Field is required',
							},
							validate: (value) =>
								(value > 1 && value < 99) ||
								'Enter a valid age',
						})}
						type='number'
						className={styles['edit__input2']}
					/>
					{errors.age && (
						<p className={styles['edit__error2']}>
							{errors.age.message}
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

export default ProfileSettingsEdit;
