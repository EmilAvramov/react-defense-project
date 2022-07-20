import useFetchUser from '../../hooks/useFetchUser';
import logout from '../../auth/logout';
import { useAuth } from '../../contexts/AuthContext';

import { GridLoader } from 'react-spinners';
import styles from '../../styles/components/Home.module.scss';

const Home = () => {
	const { currentUser } = useAuth();
	const { name, userLoading } = useFetchUser(currentUser);
	
	return (
		<div className={styles['dashboard']}>
			<div className={styles['dashboard__container']}>
				Currently browsing as
				{currentUser ? (
					userLoading ? (
						<GridLoader loading={userLoading} />
					) : (
						<>
							<div>{name}</div>
							<div>{currentUser.email}</div>
							<button
								className={styles['dashboard__btn']}
								onClick={logout}
							>
								Logout
							</button>
						</>
					)
				) : (
					<div>Guest</div>
				)}
			</div>
		</div>
	);
};
export default Home;
