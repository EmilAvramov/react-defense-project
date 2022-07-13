import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase-config';

const logout = () => {
	signOut(auth);
};

export default logout;
