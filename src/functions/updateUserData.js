import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase-config';

const updateUserData = (data, unique) => {
    // Setup ref
    const userRef = doc(db, 'users', unique);
    
    // Run update 
    const update = async () => {
        await updateDoc(userRef, { ...data });
    };
    update();
};

export default updateUserData;
