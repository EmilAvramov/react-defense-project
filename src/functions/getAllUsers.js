import { collection, getDocs } from 'firebase/firestore';

import { db } from '../config/firebase-config';

const getAllUsers = async () => {
	const usersRef = collection(db, 'users');
	const users = await getDocs(usersRef);
	
	return users.size;
};

export default getAllUsers;
