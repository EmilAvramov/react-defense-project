import { useOutletContext } from 'react-router-dom';

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

	return (
		<div className={styles['edit__wrapper']}>
			<button className={styles['delete__button']} onClick={runDelete}>
				Delete Account
			</button>
		</div>
	);
};

export default ProfileSettingsDelete;
