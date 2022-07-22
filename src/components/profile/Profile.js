import { Link, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

import useGetAllUserGames from '../../hooks/useGetAllUserGames';
import useGetUserDocument from '../../hooks/useGetUserDocument';

import styles from '../../styles/components/Profile.module.scss';

const Profile = () => {
	const { currentUser } = useAuth();
	const { unique, fetchError, userLoading } = useGetUserDocument();
	const { data, loading, error, handleRequest } = useGetAllUserGames(
		currentUser.uid
	);
	const navigate = useNavigate();

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
						<Link to='settings' className={styles['profile__link']}>
							Settings
						</Link>
					</li>
				</ul>
			</nav>
			<Outlet
				context={{
					currentUser,
					unique,
					fetchError,
					userLoading,
					data,
					loading,
					error,
					handleRequest,
					navigate,
				}}
			/>
		</>
	);
};

export default Profile;
