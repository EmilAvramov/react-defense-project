import { useNavigate } from 'react-router-dom';

import logout from '../../auth/logout';
import useDeleteUser from '../../hooks/useDeleteUser';
import styles from '../../styles/components/Profile.module.scss';

const ProfileSettingsDelete = () => {
	const navigate = useNavigate();
	const { deleteAccount } = useDeleteUser();

	const runDelete = () => {
		deleteAccount();
		navigate('/');
		logout();
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
