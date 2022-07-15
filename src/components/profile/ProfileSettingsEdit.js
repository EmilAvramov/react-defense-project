import { useState } from 'react';

import styles from '../../styles/components/Profile.module.scss';

const ProfileSettingsEdit = () => {
	const [formData, setFormData] = useState({
		name: '',
		age: '',
	});

	const clear = () =>
		setFormData({
			name: '',
			age: '',
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

	const clearData = (e) => {
		e.preventDefault();
		clear();
	};

	return (
		<div className={styles['edit__wrapper']}>
			<form className={styles['edit__form']}>
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
