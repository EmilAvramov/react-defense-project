import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../config/firebase-config';

const sendPasswordReset = async (email) => {
	try {
		await sendPasswordResetEmail(auth, email);
		alert('Password reset link sent!');
	} catch (err) {
		alert(err.message) 
	}
};

export default sendPasswordReset;
