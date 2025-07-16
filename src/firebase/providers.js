import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { firebaseAuth } from "./config";

// crear una instancia del provedor de google
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({

  prompt: "select_account",

});

// funcion para iniciar sesion con google
export const signInWithGoogle = async() => {
    try {
        // iniciar el proceso de inicio de sesion con google
        const result = await signInWithPopup( firebaseAuth, googleProvider );

        // const credentials = GoogleAuthProvider.credentialFromResult(res);
        // console.log({ credentials });

        const { uid, displayName, email, photoURL } = result.user;

        return {
            ok: true,

            // info del user autenticado
            uid,
            displayName,
            email,
            photoURL,
        }

    } catch (error) {

        const errorCode = error.code;
        let errorMessage = error.message;

        if (errorMessage === 'Firebase: Error (auth/popup-closed-by-user).') {
            errorMessage = 'Auth pop-up closed by user.';
        } else if (errorMessage === 'Firebase: Error (auth/popup-blocked).') {
            errorMessage = 'Auth pop-up blocked.';
        }

        return {
            ok: false, 
            errorMessage,
        }
    }
}

export const registerUserWithEmailPassword = async({displayName, email, password}) => {
    try {
        
        const resp = await createUserWithEmailAndPassword (firebaseAuth, email, password);

        const {uid, photoURL} = resp.user;

        // actualizar el displayName del usuario registrado

        await updateProfile(firebaseAuth.currentUser, {displayName});

        return {
            ok: true,
            uid,
            photoURL,
            email,
            displayName,
        }

    } catch (error) {

        let errorMessage = error.message;
        
        if(errorMessage === 'Firebase: Error (auth/email-already-in-use).'){
            errorMessage = 'The email is already in use.'
        }

        return {
            ok: false,
            errorMessage,
        }
    }
}

export const loginWithEmailPassword = async({email, password}) => {
    try {

        const resp = await signInWithEmailAndPassword(firebaseAuth, email, password);

        const {uid, displayName, photoURL } = resp.user;

        return {
            ok: true,
            email,
            uid,
            displayName,
            photoURL
        }
        
    } catch (error) {

        let errorMessage = error.message;
        if (errorMessage === 'Firebase: Error (auth/invalid-credential).') {
            errorMessage = 'Email or password incorrectly.'
        }

        return {
            ok: false,
            errorMessage,
        }
    }
}

export const logOut = async() => {
    try {
        
        await signOut(firebaseAuth);
        return {
            ok: true
        }

    } catch (error) {
        
        let errorMessage = error.message;

        return {
            ok: false,
            errorMessage,
        }
    }
}