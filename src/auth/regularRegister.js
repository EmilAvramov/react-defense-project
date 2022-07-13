import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase-config';

const registerWithEmailAndPassword = async (data) => {
	try {
		const res = await createUserWithEmailAndPassword(
			auth,
			data.email,
			data.password
		);
		const user = res.user;
		await addDoc(collection(db, 'users'), {
			uid: user.uid,
			name: data.name,
			authProvider: 'local',
			email: data.email,
		});
	} catch (err) {
		console.error(err);
		alert(err.message);
	}
};

export default registerWithEmailAndPassword;
