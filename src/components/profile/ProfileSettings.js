import { useAuth } from '../../contexts/AuthContext';

import useGetAllUserGames from '../../hooks/useGetAllUserGames';
import Loader from '../helpers/GridLoader';

import styles from '../../styles/components/Profile.module.scss';

const ProfileSettings = () => {
	const { currentUser } = useAuth();
	const { data, loading, error } = useGetAllUserGames(currentUser.uid);
	console.log(data, error);

    return (
        <div className={styles['library__container']}>
           {loading ? <Loader/> : 'Loaded'}
        </div>
    )
};

export default ProfileSettings;
