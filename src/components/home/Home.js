import { useState } from 'react';

import HomeCarousel from './HomeCarousel';
import useFetchUser from '../../hooks/useFetchUser';
import { useAuth } from '../../contexts/AuthContext';
import useGetAllData from '../../hooks/useGetAllData';
import useGetAllGames from '../../hooks/useGetAllGames';

import Err from '../helpers/Error';
import Loader from '../helpers/GridLoader';
import { homeLoader, topLoader } from '../../styles/auxilary/loaderStyles';

import banner from '../../assets/guest-banner.png';
import aside from '../../assets/guest-aside.png';
import styles from '../../styles/components/Home.module.scss';
import { useEffect } from 'react';

const Home = () => {
	// Call relevant hooks
	const { currentUser } = useAuth();
	const { name, userError } = useFetchUser(currentUser);
	const { gamesCount, userCount, screenshotCount, dataLoading, dataError } =
		useGetAllData(currentUser);
	const [userLoading, setUserLoading] = useState(true);
	const { gamesData, fetchError, fetchLoading } = useGetAllGames();

	useEffect(() => {
		if (name) {
			setUserLoading(false);
		}
	}, [name]);

	return (
		<div className={styles['home__wrapper']}>
			<div className={styles['home__top']}>
				{currentUser ? (
					userLoading ? (
						<Loader
							loading={userLoading}
							styles={topLoader}
							size={20}
						/>
					) : userError ? (
						<Err error={userError} styles={'home__top'} />
					) : (
						<>Currently browsing as {name}</>
					)
				) : (
					<>Currently browsing as Guest</>
				)}
			</div>

			{currentUser ? (
				<>
					<main className={styles['home__main']}>
						{fetchLoading ? (
							<Loader
								loading={fetchLoading}
								styles={homeLoader}
								size={60}
							/>
						) : fetchError ? (
							<Err error={fetchError} />
						) : (
							<>
								<h2>Most popular games among our users</h2>
								<HomeCarousel data={gamesData} />
							</>
						)}
					</main>
					<aside className={styles['home__aside']}>
						{dataLoading ? (
							<Loader
								loading={dataLoading}
								styles={homeLoader}
								size={60}
							/>
						) : dataError ? (
							<Err error={dataError} styles={'home__aside'} />
						) : (
							<>
								<div className={styles['home__container']}>
									We have {userCount}{' '}
									{userCount > 1 ? 'users.' : 'user.'}
								</div>
								<div className={styles['home__container']}>
									Our users have added {gamesCount} games to
									their libraries.
								</div>
								<div className={styles['home__container']}>
									Our users have uploaded {screenshotCount}{' '}
									screenshots.
								</div>
							</>
						)}
					</aside>
				</>
			) : (
				<>
					<main className={styles['home__main']}>
						<img src={banner} alt='' />
					</main>
					<aside className={styles['home__aside']}>
						<img src={aside} alt='' />
					</aside>
				</>
			)}
		</div>
	);
};
export default Home;
