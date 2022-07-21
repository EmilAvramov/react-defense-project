import useFetchUser from '../../hooks/useFetchUser';
import { useAuth } from '../../contexts/AuthContext';
import useGetAllData from '../../hooks/useGetAllData';

import Error from '../helpers/Error';
import { GridLoader } from 'react-spinners';
import styles from '../../styles/components/Home.module.scss';

const Home = () => {
	const { currentUser } = useAuth();

	const { name, userLoading } = useFetchUser(currentUser);
	const { gamesCount, userCount, screenshotCount, dataLoading, dataError } =
		useGetAllData();

	return (
		<div className={styles['home__wrapper']}>
			<div className={styles['home__top']}>
				{currentUser ? (
					userLoading ? (
						<GridLoader loading={userLoading} />
					) : (
						<>Currently browsing as {name}</>
					)
				) : (
					<>Currently browsing as Guest</>
				)}
			</div>

			{currentUser ? (
				<>
					<main className={styles['home__main']}>Placeholder</main>
					<aside className={styles['home__aside']}>
						{dataError ? (
							<Error error={dataError} />
						) : dataLoading ? (
							<GridLoader loading={dataLoading} />
						) : (
							<>
								<div className={styles['home__container']}>
									We have {userCount} members.
								</div>
								<div className={styles['home__container']}>
									Our members have added {gamesCount} games to
									their libraries.
								</div>
								<div className={styles['home__container']}>
									Our members have uploaded {screenshotCount}{' '}
									screenshots.
								</div>
							</>
						)}
					</aside>
				</>
			) : (
				<>
					<main className={styles['home__main']}>Placeholder</main>
					<aside className={styles['home__aside']}>Placeholder</aside>
				</>
			)}
		</div>
	);
};
export default Home;
