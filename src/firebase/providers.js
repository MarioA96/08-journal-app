import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";


const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async(auth) => {

    try {

        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult(result);
        const { displayName, email, photoURL, uid } = result.user;

        return {
            ok: true,
            // User info
            displayName, email, photoURL, uid
        }
        

    } catch (error) {
        
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);

        return {
            ok: false,
            errorMessage, errorCode, email, credential
        }
    }

};

export const registerUserWithEmailPassword = async({ displayName, email, password }) => {

    try {
        
        // console.log({email, password, displayName});

        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL } = resp.user;
        // console.log(resp);
        await updateProfile( FirebaseAuth.currentUser, { displayName } );

        return {
            ok: true,
            // User info
            displayName, email, photoURL, uid
        }

    } catch (error) {

        // console.log(error);

        return {
            ok: false,
            errorMessage: error.message //Aqui pueden ir las validaciones de errores personalizadas.
        }
    }

};


export const loginWithEmailPassword = async({ email, password }) => {

    try {
        
        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL, displayName } = resp.user;

        return {
            ok: true,
            // User info
            uid, photoURL, displayName, email
        }

    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message //Aqui pueden ir las validaciones de errores personalizadas.
        }
    }

};

export const logoutFirebase = async() => {

    return await FirebaseAuth.signOut();
};