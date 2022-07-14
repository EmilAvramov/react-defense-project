import { useAuth } from '../../contexts/AuthContext';

import Card from './Card';
import useGetAllUserGames from '../../hooks/useGetAllUserGames';

import Loader from '../helpers/GridLoader';
import Err from '../helpers/Error';
import styles from '../../styles/components/Profile.module.scss';

const ProfileLibrary = () => {
	const { currentUser } = useAuth();
	const { data, loading, error, handleRequest } = useGetAllUserGames(currentUser.uid);

	const cards = data.map((x) => <Card key={x.id} change={handleRequest} {...x} />);

	return (
		<div className={styles['library__container']}>
			{error ? <Err error={error} /> : loading ? <Loader /> : cards}
		</div>
	);
};

export default ProfileLibrary;
