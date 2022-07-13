// JavaScript
// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

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

export { auth, db, storage };
