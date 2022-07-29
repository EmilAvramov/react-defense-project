import { doc, updateDoc } from 'firebase/firestore';

import { db } from '../config/firebase-config';

const updateUserData = (data, docRef) => {
	const update = async () => {
		try {
			// Setup ref to user document in db
			const userRef = doc(db, 'users', docRef);
			// Run update
			await updateDoc(userRef, { ...data });
		} catch (err) {
			alert(err.message);
		}
	};
	update();
};

export default updateUserData;
