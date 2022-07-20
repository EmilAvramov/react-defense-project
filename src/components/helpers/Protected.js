import { Navigate } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';

const Protected = ({ children }) => {
	const { currentUser } = useAuth();
	if (currentUser) {
		return children;
	}
	return <Navigate to='/login' replace />;
};

export default Protected;
