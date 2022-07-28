import HomeCarousel from './HomeCarousel';

import Err from '../helpers/Error';
import banner from '../../assets/home__banner.png';
import styles from '../../styles/components/Home.module.scss';

const HomeMain = ({
	currentUser,
	gamesData,
	dataError,
	userCount,
	gamesCount,
	screenshotCount,
}) => {
	return (
		<>
			{currentUser ? (
				<>
					<main className={styles['home__main']}>
						{dataError ? (
							<Err error={dataError} />
						) : (
							<>
								<h2>Most popular games among our users</h2>
								<HomeCarousel data={gamesData} />
							</>
						)}
					</main>
					<aside className={styles['home__aside']}>
						{dataError ? (
							<Err error={dataError} styles={'home__aside'} />
						) : (
							<>
								<div className={styles['home__container']}>
									We have {userCount}
									{userCount > 1 ? ' users.' : ' user.'}
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
					<main className={styles['home__guest']}>
						<img src={banner} alt='' />
					</main>
				</>
			)}
		</>
	);
};

export default HomeMain;
