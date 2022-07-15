import { updateEmail } from "firebase/auth";
import { auth } from "../config/firebase-config";

const updateUserEmail = (newEmail) => {
    try {
        updateEmail(auth.currentUser, newEmail)
    } catch (err) {
        console.log(err)
    }
}

export default updateUserEmail;