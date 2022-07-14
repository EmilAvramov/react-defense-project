import { useAuth } from '../../contexts/AuthContext';
import useGetAllUserGames from '../../hooks/useGetAllUserGames';

const ProfileLibrary = () => {
	const { currentUser } = useAuth();
	const { data, loading, error } = useGetAllUserGames(currentUser.uid);
	console.log(data);
};

export default ProfileLibrary;
