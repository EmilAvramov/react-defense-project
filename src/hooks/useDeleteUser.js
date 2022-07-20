import { deleteUser } from 'firebase/auth';
import { doc, deleteDoc } from 'firebase/firestore';

import { db } from '../config/firebase-config';
import { useAuth } from '../contexts/AuthContext';
import useGetUserDocument from './useGetUserDocument';

const useDeleteUser = () => {
	// Get current user from auth and from db
	const { currentUser } = useAuth();
	const { unique } = useGetUserDocument();

	// Create delete function (db doc first, auth second)
	const deleteAccount = () => {
		deleteDoc(doc(db, 'users', unique)).then(deleteUser(currentUser));
	};

	return { deleteAccount };
};

export default useDeleteUser;
