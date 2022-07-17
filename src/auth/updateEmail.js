import { updateEmail } from "firebase/auth";
import { auth } from "../config/firebase-config";

const updateUserEmail = (newEmail) => {
    try {
        updateEmail(auth.currentUser, newEmail)
    } catch (err) {
        alert(err.message) 
    }
}

export default updateUserEmail;