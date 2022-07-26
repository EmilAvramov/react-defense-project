import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import Confirm from '../helpers/Confirm';
import logout from '../../auth/logout';
import useDeleteUser from '../../hooks/useDeleteUser';

import styles from '../../styles/components/Profile.module.scss';

const ProfileSettingsDelete = () => {
	// Prepare navigation and delete account hook
	const { navigate } = useOutletContext();
	const { deleteAccount } = useDeleteUser();

	// Execute hook, redirect user and logout
	const runDelete = () => {
		try {
			deleteAccount();
			navigate('/');
			logout();
		} catch (err) {
			alert('Something went wrong, please try again');
		}
	};

	// Handle delete confirmation
	const [confirm, setConfirm] = useState(false);

	const handleConfirm = () => {
		setConfirm((state) => !state);
	};

	return (
		<div className={styles['edit__wrapper']}>
			{!confirm ? (
				<button
					className={styles['delete__button']}
					onClick={handleConfirm}
				>
					Delete Account
				</button>
			) : (
				<Confirm
					action={runDelete}
					handle={setConfirm}
					location={'account'}
				/>
			)}
		</div>
	);
};

export default ProfileSettingsDelete;
