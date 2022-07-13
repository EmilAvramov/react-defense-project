// JavaScript
// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import {
	GoogleAuthProvider,
	getAuth,
	signInWithPopup,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signOut,
} from 'firebase/auth';
import {
	getFirestore,
	query,
	getDocs,
	collection,
	where,
	addDoc,
} from 'firebase/firestore';

const firebaseConfig = {
	apiKey: `${process.env.REACT_APP_FIREBASE_KEY}`,
	authDomain: `${process.env.REACT_APP_DOMAIN}`,
	databaseURL: `${process.env.REACT_APP_DB_URL}`,
	projectId: `${process.env.REACT_APP_PID}`,
	storageBucket: `${process.env.REACT_APP_STORAGE}`,
	messagingSenderId: `${process.env.REACT_APP_SID}`,
	appId: `${process.env.REACT_APP_APP_ID}`,
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
	try {
		const res = await signInWithPopup(auth, googleProvider);
		const user = res.user;
		const q = query(collection(db, 'users'), where('uid', '==', user.uid));
		const docs = await getDocs(q);
		if (docs.docs.length === 0) {
			await addDoc(collection(db, 'users'), {
				uid: user.uid,
				name: user.displayName,
				authProvider: 'google',
				email: user.email,
			});
		}
	} catch (err) {
		console.error(err);
		alert(err.message);
	}
};
const logInWithEmailAndPassword = async (data) => {
	try {
		await signInWithEmailAndPassword(auth, data.email, data.password);
	} catch (err) {
		console.error(err);
		alert(err.message);
	}
};
const registerWithEmailAndPassword = async (data) => {
	try {
		const res = await createUserWithEmailAndPassword(auth, data.email, data.password);
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
const sendPasswordReset = async (email) => {
	try {
		await sendPasswordResetEmail(auth, email);
		alert('Password reset link sent!');
	} catch (err) {
		console.error(err);
		alert(err.message);
	}
};
const logout = () => {
	signOut(auth);
};
export {
	auth,
	db,
	storage,
	signInWithGoogle,
	logInWithEmailAndPassword,
	registerWithEmailAndPassword,
	sendPasswordReset,
	logout,
};
