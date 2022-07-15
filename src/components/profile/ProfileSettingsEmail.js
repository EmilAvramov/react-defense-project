import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import updateUserData from '../../functions/updateUserData';
import useGetUserDocument from '../../hooks/useGetUserDocument';
import updateUserEmail from '../../auth/updateEmail';

import Err from '../helpers/Error';
import Loader from '../helpers/GridLoader';

import styles from '../../styles/components/Profile.module.scss';

const ProfileSettingsEmail = () => {
	// Setup react hooks
	const navigate = useNavigate();
	const [updateError, setUpdateError] = useState('');
	const { unique, fetchError, loading } = useGetUserDocument();

	// Manage form data
	const [formData, setFormData] = useState({
		email: '',
		emailRe: '',
	});

	const handleChange = (e) => {
		const { name, value, checked, type } = e.target;
		setFormData((prevData) => {
			return {
				...prevData,
				[name]: type === 'checkbox' ? checked : value,
			};
		});
	};

	const submitData = (e) => {
		e.preventDefault();
		try {
			updateUserEmail(formData.email);
			updateUserData({ email: formData.email }, unique);
			alert('Email Successfully Updated')
			setTimeout(navigate('/'), 3000) 
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
					New Email
				</label>
				<input
					type='email'
					name='email'
					className={styles['edit__input_name']}
					onChange={handleChange}
					value={formData.email}
				/>
				<label htmlFor='age' className={styles['edit__label_age']}>
					Repeat New Email
				</label>
				<input
					type='email'
					name='emailRe'
					className={styles['edit__input_age']}
					onChange={handleChange}
					value={formData.emailRe}
				/>
				<button className={styles['edit__submit']}>
					Submit Changes
				</button>
			</form>
		</div>
	);
};

export default ProfileSettingsEmail;
