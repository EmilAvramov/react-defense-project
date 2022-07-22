import useFetchUser from '../../hooks/useFetchUser';
import { useAuth } from '../../contexts/AuthContext';
import useGetAllData from '../../hooks/useGetAllData';

import Err from '../helpers/Error';
import Loader from '../helpers/GridLoader';
import { homeLoader } from '../../styles/auxilary/loaderStyles';
import styles from '../../styles/components/Home.module.scss';

const Home = () => {
	const { currentUser } = useAuth();

	const { name, userLoading } = useFetchUser(currentUser);
	const { gamesCount, userCount, screenshotCount, dataLoading, dataError } =
		useGetAllData(currentUser);

	return (
		<div className={styles['home__wrapper']}>
			<div className={styles['home__top']}>
				{currentUser ? (
					userLoading ? (
						<Loader
							loading={userLoading}
							styles={homeLoader}
							size={20}
						/>
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
							<Err error={dataError} styles={'home__aside'} />
						) : dataLoading ? (
							<Loader
								loading={dataLoading}
								styles={homeLoader}
								size={60}
							/>
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
