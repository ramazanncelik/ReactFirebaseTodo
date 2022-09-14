import { initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, sendEmailVerification, sendPasswordResetEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth'
import { getFirestore, collection, addDoc, onSnapshot, query, where, deleteDoc, doc, updateDoc } from "firebase/firestore";
import toast from 'react-hot-toast'
import store from './store/index'
import { logout as logoutHandle } from './store/auth'
import { openModal } from './store/modal'
import { setTodos } from "./store/todos";
import { setUserData } from "./utils/utils";

const firebaseConfig = {
    apiKey: your_apiKey,
    authDomain: your_databaseURL,
    databaseURL: your_databaseURL,
    projectId: your_projectId,
    storageBucket: your_storageBucket,
    messagingSenderId: your_messagingSenderId,
    appId: your_appId,
    measurementId: your_measurementId
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const firestoreDatabase = getFirestore(app);

export async function register(email, password) {
    try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        toast.success("Başarılı bir şekilde kayıt oldunuz.")
        return user;
    } catch (error) {
        toast.error(error.message, { position: 'top-left' })
    }
}

export async function login(email, password) {
    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        return user;
    } catch (error) {
        toast.error(error.message, { position: 'top-left' })
    }
}

export async function logout() {
    try {
        await signOut(auth);
        return true;
    } catch (error) {
        toast.error(error.message, { position: 'top-left' })
    }
}

export const update = async (data) => {

    try {
        await updateProfile(auth.currentUser, data)
        toast.success("Profil Güncellendi")
        return true
    } catch (error) {
        toast.error(error.message)
    }

}

export const emailVerification = async () => {
    try {
        await sendEmailVerification(auth.currentUser);
        toast.success(`Doğrulama maili ${auth.currentUser.email} adresine gönderildi, Lütfen Kontrol Ediniz!`)
    } catch (error) {
        toast.error(error)
    }
}

export const changePasswordWithEmail = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        toast.success(`Şifre Değiştirme maili ${email} adresine gönderildi, Lütfen Kontrol Ediniz!`, { duration: 4000 });
        return true
    } catch (error) {
        toast.error(error)
    }
}

export const changePassword = async newPassword => {
    await updatePassword(auth.currentUser, newPassword).then(() => {
        toast.success(`Parola Güncellendi`);
    }).catch(error => {
        if (error.code === 'auth/requires-recent-login') {
            store.dispatch(openModal({
                name: 're-auth-modal'
            }))
        }
        toast.error(error.message)
    });
}

export async function reAuth(password) {
    try {
        const credentials = await EmailAuthProvider.credential(
            auth.currentUser.email,
            password
        )
        const { user } = await reauthenticateWithCredential(auth.currentUser, credentials);
        return user;
    } catch (error) {
        toast.error(error.message, { position: 'top-left' })
    }
}

export const addTodo = async data => {
    try {
        const result = await addDoc(collection(firestoreDatabase, 'todos'), data);
        return result.id;
    } catch (error) {
        toast.error(error.message)
    }
}

export const deleteTodo = async id => {
    try {
        await deleteDoc(doc(firestoreDatabase, 'todos', id))
    } catch (error) {
        toast.error(error.message)
    }
}

export const updateTodo = async info => {
    await updateDoc(doc(firestoreDatabase, "todos", info.id), {
        isDone: !info.isDone
    });
}

onAuthStateChanged(auth, (user) => {
    if (user) {

        setUserData();

        onSnapshot(query(collection(firestoreDatabase, "todos"), where('uid', '==', user.uid)), (doc) => {
            store.dispatch(setTodos(doc.docs.reduce((todos, todo) => [...todos, { ...todo.data(), id: todo.id }], [])))
        })

    } else {
        store.dispatch(logoutHandle())
    }
})
