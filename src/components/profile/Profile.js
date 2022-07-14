import { Link } from 'react-router-dom';
import styles from '../../styles/components/Profile.module.scss';

const Profile = () => {
	return (
		<div className={styles['profile__wrapper']}>
			<ul className={styles['profile__container']}>
				<li className={styles['profile__block']}>
					<Link
						to='profile/library'
						className={styles['profile__link']}
					>
						My Library
					</Link>
				</li>
				<li className={styles['profile__block']}>
					<Link
						to='profile/content'
						className={styles['profile__link']}
					>
						My Content
					</Link>
				</li>
				<li className={styles['profile__block']}>
					<Link
						to='profile/community'
						className={styles['profile__link']}
					>
						My Community Activity
					</Link>
				</li>
				<li className={styles['profile__block']}>
					<Link
						to='profile/settings'
						className={styles['profile__link']}
					>
						Settings
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default Profile;
