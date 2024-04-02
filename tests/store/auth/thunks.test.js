//En la seccion de testing es recomendable no llamar el archivo de barril
// sino llamar directamente el archivo que se va a testear
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout, startGoogleSignIn } from "../../../src/store/auth";
import { checkingAuthentication, startCreatingUserWithEmailPassword, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/thunks";
import { clearNotesLogout } from "../../../src/store/journal";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock('../../../src/firebase/providers');

describe('Pruebas en Auth Thunks', () => {
    
    const dispatch = jest.fn();
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Debe de invocar el checkingCredentials', async() => {
        
        //El primer () es para invocar la función el segundo () es para el valor de retorno
        await checkingAuthentication()( dispatch );
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        
    });


    test('startGoogleSignIn debe de llamar checkingCredentials y login - Exito', async() => {
      
        const loginData = { ok: true, ...demoUser };

        //Este es el mock de la función signInWithGoogle
        await signInWithGoogle.mockResolvedValue( loginData );

        //Este es el thunk que se va a testear
        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );

    });

    test('startGoogleSignIn debe de llamar checkingCredentials y logout - Error', async() => {
      
        const loginData = { ok: false, errorMessage: 'Error desde el proveedor de Google'};

        //Este es el mock de la función signInWithGoogle
        await signInWithGoogle.mockResolvedValue( loginData );

        //Este es el thunk que se va a testear
        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) );

    });

    test('startCreatingUserWithEmailPassword debe de llamar registerUserWithEmailPassword y login con parametros - Exito', async() => {
      
        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: '1234567', displayName: demoUser.displayName };

        //Este es el mock de la función signInWithGoogle
        await registerUserWithEmailPassword.mockResolvedValue( loginData );

        //Este es el thunk que se va a testear
        await startCreatingUserWithEmailPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );

    });

    test('startLoginWithEmailPassword debe de llamara checkingCredentials y login - Exito', async() => {
        
        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: '1234567'};

        await loginWithEmailPassword.mockResolvedValue( loginData );

        await startLoginWithEmailPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );

    });
    
    test('startLogout debe de llamar logoutfirebase, clearNotes y logout', async() => {
    
        await startLogout()( dispatch );

        expect( logoutFirebase ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
        expect( dispatch ).toHaveBeenCalledWith( logout() );

    });
    
    

});
