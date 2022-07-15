import { Link, Outlet } from 'react-router-dom';

import styles from '../../styles/components/Profile.module.scss';

const ProfileSettings = () => {
	return (
		<>
			<nav className={styles['profile__wrapper']}>
				<ul className={styles['settings__container']}>
					<li className={styles['profile__block']}>
						<Link to='edit' className={styles['profile__link']}>
							Edit Information
						</Link>
					</li>
					<li className={styles['profile__block']}>
						<Link to='email' className={styles['profile__link']}>
							Change Email
						</Link>
					</li>
					<li className={styles['profile__block']}>
						<Link to='password' className={styles['profile__link']}>
							Change Password
						</Link>
					</li>
					<li className={styles['profile__block']}>
						<Link to='delete' className={styles['profile__link']}>
							Delete Account
						</Link>
					</li>
				</ul>
			</nav>
			<Outlet/>
		</>
	);
};

export default ProfileSettings;
