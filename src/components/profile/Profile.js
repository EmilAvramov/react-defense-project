import { Link, Outlet } from 'react-router-dom';
import styles from '../../styles/components/Profile.module.scss';

const Profile = () => {
	return (
		<>
			<nav className={styles['profile__wrapper']}>
				<ul className={styles['profile__container']}>
					<li className={styles['profile__block']}>
						<Link to='library' className={styles['profile__link']}>
							My Library
						</Link>
					</li>
					<li className={styles['profile__block']}>
						<Link
							to='community'
							className={styles['profile__link']}
						>
							My Community Activity
						</Link>
					</li>
					<li className={styles['profile__block']}>
						<Link to='settings' className={styles['profile__link']}>
							Settings
						</Link>
					</li>
				</ul>
			</nav>
			<Outlet/>
		</>
	);
};

export default Profile;
