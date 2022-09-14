import { login } from '../store/auth';
import store from '../store/index'
import { closeModal } from '../store/modal'
import { auth } from '../Firebase'

export const modalClose = () => {
    store.dispatch(closeModal());
}

export const setUserData = () => {
    store.dispatch(login({
        uid: auth.currentUser.uid,
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        emailVerified: auth.currentUser.emailVerified,
        photoURL: auth.currentUser.photoURL,
    }))
}