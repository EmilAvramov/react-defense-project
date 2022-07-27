import { useState, useEffect } from 'react';

import useFetchUser from '../../hooks/useFetchUser';
import { useAuth } from '../../contexts/AuthContext';
import useGetAllData from '../../hooks/useGetAllData';
import useGetAllGames from '../../hooks/useGetAllGames';

import HomeMain from './HomeMain';
import HomeTop from './HomeTop';
import Loader from '../helpers/RingLoader';
import { homeLoader } from '../../styles/auxilary/loaderStyles';

import styles from '../../styles/components/Home.module.scss';

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
		<div
			className={
				currentUser ? styles['home__wrapper'] : styles['home__guest']
			}
		>
			{userLoading || fetchLoading || dataLoading ? (
				<Loader loading={userLoading} styles={homeLoader} size={80} />
			) : (
				<>
					<HomeTop
						currentUser={currentUser}
						userError={userError}
						name={name}
					/>
					<HomeMain
						currentUser={currentUser}
						fetchError={fetchError}
						gamesData={gamesData}
						dataError={dataError}
						userCount={userCount}
						gamesCount={gamesCount}
						screenshotCount={screenshotCount}
					/>
				</>
			)}
		</div>
	);
};
export default Home;
