
//Recordando que los thunks son funciones que retornan otras funciones
// y que estas últimas pueden hacer dispatch de acciones asíncronas.

import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../journal";
import { checkingCredentials, login, logout } from "./";

export const checkingAuthentication = () => {
    return async( dispatch ) => {
        //Aquí deberíamos hacer una petición a la API para verificar si el usuario está autenticado.
        //Por ahora, solo simularemos una demora de 2 segundos.
        dispatch( checkingCredentials() );
        // setTimeout(() => {
        //     dispatch( login() );
        // }, 2000);

    }
}

export const startGoogleSignIn = () => { 
    return async( dispatch ) => {
        //Aquí deberíamos hacer una petición a la API para iniciar sesión con Google.
        //Por ahora, solo simularemos una demora de 2 segundos.
        dispatch( checkingCredentials() );
        // setTimeout(() => {
        //     dispatch( login() );
        // }, 2000);
        const result = await signInWithGoogle();
        if (!result.ok) return dispatch( logout( result.errorMessage ) );

        dispatch( login( result ) );
    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );

        const { ok, uid, photoUrl, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName });

        if( !ok ) return dispatch( logout({ errorMessage }) );

        dispatch( login({ uid, displayName, email, photoUrl }) );
    }
};

export const startLoginWithEmailPassword = ({ email, password }) => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );
        
        const { ok, uid, photoUrl, errorMessage } = await loginWithEmailPassword({ email, password });
        // console.log(result);

        if( !ok ) return dispatch( logout({ errorMessage }) );

        dispatch( login({ uid, displayName, email, photoUrl }) );
    }

};

export const startLogout = () => {

    return async( dispatch ) => {
        
        await logoutFirebase();
        // Esta linea debajo podria mejorarse, ya que estamos haciendo dispatch a otro slice.
        // Una idea seria hacer un dispatch a una accion que haga dispatch a las acciones de los slices.
        // Pero por mientras, lo dejaremos así.
        dispatch( clearNotesLogout() );
        dispatch( logout() );
    }
};