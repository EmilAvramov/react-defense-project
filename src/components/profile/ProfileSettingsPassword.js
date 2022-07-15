import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import updateUserPassword from '../../auth/updatePassword';

import styles from '../../styles/components/Profile.module.scss';

const ProfileSettingsPassword = () => {
	// Setup react hooks
	const navigate = useNavigate();
	const [updateError, setUpdateError] = useState('');

	// Manage form data
	const [formData, setFormData] = useState({
		password: '',
		rePass: '',
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
			updateUserPassword(formData.email);
			alert('Password Successfully Updated')
			setTimeout(navigate('/'), 3000) 
		} catch (err) {
			setUpdateError(err);
		}
	};

	return (
		<div className={styles['edit__wrapper']}>
			{updateError && <div>{updateError.message}</div>}
			<form onSubmit={submitData} className={styles['edit__form']}>
				<label htmlFor='name' className={styles['edit__label_name']}>
					New Password
				</label>
				<input
					type='password'
					name='password'
					className={styles['edit__input_name']}
					onChange={handleChange}
					value={formData.password}
				/>
				<label htmlFor='age' className={styles['edit__label_age']}>
					Repeat Password
				</label>
				<input
					type='password'
					name='rePass'
					className={styles['edit__input_age']}
					onChange={handleChange}
					value={formData.rePass}
				/>
				<button className={styles['edit__submit']}>
					Submit Changes
				</button>
			</form>
		</div>
	);
};

export default ProfileSettingsPassword;
