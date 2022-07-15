import { updatePassword } from "firebase/auth";
import { auth } from "../config/firebase-config";

const updateUserPassword = (newPassword) => {
    try {
        updatePassword(auth.currentUser, newPassword)
    } catch (err) {
        console.log(err)
    }
}

export default updateUserPassword;