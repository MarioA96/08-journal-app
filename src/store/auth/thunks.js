
//Recordando que los thunks son funciones que retornan otras funciones
// y que estas últimas pueden hacer dispatch de acciones asíncronas.

import { signInWithGoogle } from "../../firebase/providers";
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
