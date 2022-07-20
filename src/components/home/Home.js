import { useState } from 'react';

import useFetchUser from '../../hooks/useFetchUser';
import logout from '../../auth/logout';
import { useAuth } from '../../contexts/AuthContext';
import getAllScreenshots from '../../functions/getAllScreenshots';
import getAllUsers from '../../functions/getAllUsers';
import getAllGames from '../../functions/getAllGames';

import { GridLoader } from 'react-spinners';
import styles from '../../styles/components/Home.module.scss';
import { useEffect } from 'react';

const Home = () => {
	const { currentUser } = useAuth();
	const [screenshotCount, setScreenshotCount] = useState();
	const [userCount, setUserCount] = useState();
	const [gamesCount, setGamesCount] = useState();
	const [dataloading, setDataLoading] = useState(false);

	const { name, userLoading } = useFetchUser(currentUser);

	useEffect(() => {
		setDataLoading(true);
		getAllScreenshots().then((res) => setScreenshotCount(res));
		getAllUsers().then((res) => setUserCount(res));
		getAllGames().then((res) => setGamesCount(res));
		setDataLoading(false);
	}, []);

	console.log(screenshotCount);
	console.log(userCount);
	console.log(gamesCount);

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
				{dataloading ? (
					<GridLoader loading={dataloading} />
				) : (
					<>
						<div className={styles['dashboard__container']}>
							We have {userCount} members.
						</div>
						<div className={styles['dashboard__container']}>
							Our members have added {gamesCount} games to their
							libraries.
						</div>
						<div className={styles['dashboard__container']}>
							Our members have uploaded {screenshotCount}{' '}
							screenshots.
						</div>
					</>
				)}
			</div>
		</div>
	);
};
export default Home;
