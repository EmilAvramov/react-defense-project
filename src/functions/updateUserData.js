import { doc, updateDoc } from 'firebase/firestore';

import { db } from '../config/firebase-config';

const updateUserData = (data, docRef) => {
    // Setup ref to user document in db
    const userRef = doc(db, 'users', docRef);
    
    // Run update 
    const update = async () => {
        await updateDoc(userRef, { ...data });
    };
    update();
};

export default updateUserData;
