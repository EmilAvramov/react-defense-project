import { useEffect, useState } from 'react';

import HomeCarousel from './HomeCarousel';

import aggregateData from '../../functions/aggregateData';

import Err from '../helpers/Error';
import banner from '../../assets/home__banner.png';
import styles from '../../styles/components/Home.module.scss';

const HomeMain = ({
	currentUser,
	gamesData,
	dataError,
	userCount,
	screenshotCount,
}) => {
	const [filtered, setFiltered] = useState(gamesData);

	useEffect(() => {
		if (currentUser) {
			setFiltered(aggregateData(gamesData));
		}
	}, [currentUser, gamesData]);

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
								<HomeCarousel data={filtered} />
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
									Our users have added {filtered.length} games
									to their libraries.
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
