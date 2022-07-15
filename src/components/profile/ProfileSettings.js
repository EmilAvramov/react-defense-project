import { Link } from 'react-router-dom';

import styles from '../../styles/components/Profile.module.scss';

const ProfileSettings = () => {
	return (
		<>
			<nav className={styles['settings__nav']}>
				<ul className={styles['settings__wrapper']}>
					<li className={styles['settings__element']}>
						<Link to='edit' className={styles['profile__link']}>
							Edit Information
						</Link>
					</li>
					<li className={styles['settings__element']}>
						<Link to='password' className={styles['profile__link']}>
							Change Password
						</Link>
					</li>
					<li className={styles['settings__element']}>
						<Link to='delete' className={styles['profile__link']}>
							Delete Account
						</Link>
					</li>
				</ul>
			</nav>
		</>
	);
};

export default ProfileSettings;
