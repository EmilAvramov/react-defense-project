import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase-config';

const updateUserData = (data, unique) => {
    const userRef = doc(db, 'users', unique);
    const update = async () => {
        await updateDoc(userRef, { ...data });
    };
    update();
};

export default updateUserData;
