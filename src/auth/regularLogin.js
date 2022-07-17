import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase-config';

const logInWithEmailAndPassword = async (data) => {
	try {
		await signInWithEmailAndPassword(auth, data.email, data.password);
	} catch (err) {
		alert(err.message) 
	}
};

export default logInWithEmailAndPassword;
