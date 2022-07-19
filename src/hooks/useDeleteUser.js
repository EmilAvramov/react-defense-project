import { deleteUser } from 'firebase/auth';

import { db } from '../config/firebase-config';
import { doc, deleteDoc } from 'firebase/firestore';

import { useAuth } from '../contexts/AuthContext';
import useGetUserDocument from './useGetUserDocument';

const useDeleteUser = () => {
	const { currentUser } = useAuth();
	const { unique } = useGetUserDocument();

	const deleteAccount = () => {
		deleteDoc(doc(db, 'users', unique)).then(deleteUser(currentUser));
	};

	return { deleteAccount };
};

export default useDeleteUser;
