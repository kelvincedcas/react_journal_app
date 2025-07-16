
import { loginWithEmailPassword, logOut, registerUserWithEmailPassword, signInWithGoogle } from '../../firebase';
import { clearNotesLogout } from '../journal';
import { checkingCredentials, login, logout } from './';

export const checkingAuthentication = ( ) => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );

    };
};

export const startLoginWithEmailPassword = ( formData ) => {
    return async( dispatch ) => {

        // iniciar el proceso de iniciar sesion con email y password
        const result = await loginWithEmailPassword(formData);

        if (!result.ok) return dispatch(logout(result));

        dispatch(login(result));
    };
};

export const startGoogleSignIn = () => {
    return async( dispatch ) => {

        const result = await signInWithGoogle();

        if (!result.ok) return dispatch(logout(result));

        dispatch(login(result));
    };
};

export const startRegisteringUserWithEmailPassword = (userData) => {
    return async(dispatch) => {

        const result = await registerUserWithEmailPassword(userData);
        
        if (!result.ok) return dispatch(logout(result));

        dispatch(login(result));
    }
}

export const startLogOut = () => {
    return async(dispatch) => {

        const result = await logOut();
        if (result.ok) {
            dispatch(logout());
            dispatch(clearNotesLogout());
        };

    };
}