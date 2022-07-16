import { updatePassword } from "firebase/auth";
import { auth } from "../config/firebase-config";

const updateUserPassword = (newPassword) => {
    try {
        updatePassword(auth.currentUser, newPassword)
    } catch (err) {
        return err.message
    }
}

export default updateUserPassword;