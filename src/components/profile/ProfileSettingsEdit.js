import { useState } from 'react';

import updateUserData from '../../functions/updateUserData';
import useGetUserDocument from '../../hooks/useGetUserDocument';

import Err from '../helpers/Error';
import Loader from '../helpers/GridLoader';

import styles from '../../styles/components/Profile.module.scss';

const ProfileSettingsEdit = () => {
	// Handle errors and retrieve user document ref
	const [updateError, setUpdateError] = useState('');
	const { unique, fetchError, loading } = useGetUserDocument();

	// Manage form data
	const [formData, setFormData] = useState({
		name: '',
		age: '',
	});

	const clear = () =>
		setFormData({
			name: '',
			age: '',
		});

	// Form handlers
	const handleChange = (e) => {
		const { name, value, checked, type } = e.target;
		setFormData((prevData) => {
			return {
				...prevData,
				[name]: type === 'checkbox' ? checked : value,
			};
		});
	};

	const clearData = (e) => {
		e.preventDefault();
		clear();
	};

	const submitData = (e) => {
		e.preventDefault();
		try {
			updateUserData(formData, unique);
		} catch (err) {
			setUpdateError(err);
		}
	};

	return loading ? (
		<Loader />
	) : fetchError ? (
		<Err error={fetchError} />
	) : (
		<div className={styles['edit__wrapper']}>
			{updateError && <div>{updateError.message}</div>}
			<form onSubmit={submitData} className={styles['edit__form']}>
				<label htmlFor='name' className={styles['edit__label_name']}>
					Name
				</label>
				<input
					type='text'
					name='name'
					className={styles['edit__input_name']}
					onChange={handleChange}
					value={formData.name}
				/>
				<label htmlFor='age' className={styles['edit__label_age']}>
					Age
				</label>
				<input
					type='number'
					name='age'
					className={styles['edit__input_age']}
					onChange={handleChange}
					value={formData.age}
				/>
				<button className={styles['edit__submit']}>
					Submit Changes
				</button>
				<button className={styles['edit__clear']} onClick={clearData}>
					Clear Form
				</button>
			</form>
		</div>
	);
};

export default ProfileSettingsEdit;
