import ProfileLibraryCard from './ProfileLibraryCard';

import { useOutletContext } from 'react-router-dom';

import Loader from '../helpers/RingLoader';
import Err from '../helpers/Error';
import styles from '../../styles/components/Profile.module.scss';

const ProfileLibrary = () => {
	// Get current user & games and map to list
	const { currentUser } = useOutletContext();
	const { data, loading, error, handleRequest } = useOutletContext(
		currentUser.uid
	);

	return (
		<div className={styles['library__container']}>
			{loading ? (
				<Loader loading={loading} size={80} />
			) : error ? (
				<Err error={error} styles={styles['library__error']} />
			) : data.length > 0 ? (
				data.map((x) => (
					<ProfileLibraryCard
						key={x.id}
						change={handleRequest}
						user={currentUser}
						{...x}
					/>
				))
			) : (
				<div className={styles['library__error']}>
					You have no games in your library.
				</div>
			)}
		</div>
	);
};

export default ProfileLibrary;
