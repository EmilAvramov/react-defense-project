import { useAuth } from '../../contexts/AuthContext';

import ProfileLibraryCard from './ProfileLibraryCard';
import useGetAllUserGames from '../../hooks/useGetAllUserGames';

import Loader from '../helpers/GridLoader';
import Err from '../helpers/Error';
import styles from '../../styles/components/Profile.module.scss';

const ProfileLibrary = () => {
	// Get current user & games and map to list
	const { currentUser } = useAuth();
	const { data, loading, error, handleRequest } = useGetAllUserGames(currentUser.uid);

	const cards = data.map((x) => <ProfileLibraryCard key={x.id} change={handleRequest} {...x} />);

	return (
		<div className={styles['library__container']}>
			{error ? <Err error={error} /> : loading ? <Loader loading={loading}/> : cards}
		</div>
	);
};

export default ProfileLibrary;
