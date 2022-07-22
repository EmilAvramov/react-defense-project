import ProfileLibraryCard from './ProfileLibraryCard';

import { useAuth } from '../../contexts/AuthContext';
import useGetAllUserGames from '../../hooks/useGetAllUserGames';

import Loader from '../helpers/RingLoader';
import Err from '../helpers/Error';
import styles from '../../styles/components/Profile.module.scss';

const ProfileLibrary = () => {
	// Get current user & games and map to list
	const { currentUser } = useAuth();
	const { data, loading, error, handleRequest } = useGetAllUserGames(
		currentUser.uid
	);

	return (
		<div className={styles['library__container']}>
			{loading ? (
				<Loader loading={loading} size={80} />
			) : error ? (
				<Err error={error} styles={styles['library__error']} />
			) : (
				data.map((x) => (
					<ProfileLibraryCard
						key={x.id}
						change={handleRequest}
						user={currentUser}
						{...x}
					/>
				))
			)}
		</div>
	);
};

export default ProfileLibrary;
