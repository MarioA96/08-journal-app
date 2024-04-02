import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixtures";

describe('Pruebas en el authSlice', () => {

    test('Debe de regresar el estado inicial y llamarse auth', () => {
        
        const state = authSlice.reducer( initialState, {} );
        // console.log(authSlice);
        
        expect( state ).toEqual( initialState );
        // console.log(state);
        expect(authSlice.name).toBe('auth');

    });

    test('Debe de realizar la autenticacion', () => {
      
        // console.log( login( demoUser ) );
        const state = authSlice.reducer( initialState, login(demoUser) );
        // console.log(state);
        expect(state).toEqual({
            status: 'authenticated', //'checking', 'not-authenticated', 'authenticated'
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null
        });

    });

    test('Debe de realizar el logout sin argumentos', () => {
      
        const state = authSlice.reducer( authenticatedState, logout() );

        expect(state).toEqual({
            status: 'not-authenticated', //'checking', 'not-authenticated', 'authenticated'
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined
        });

    });

    test('Debe de realizar el logout y mostrar el mensaje de error', () => {
      
        const errorMessage = 'Error al cerrar sesión';
        const state = authSlice.reducer( authenticatedState, logout({ errorMessage }) );

        expect(state).toEqual({
            status: 'not-authenticated', //'checking', 'not-authenticated', 'authenticated'
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorMessage
        });

    });

    test('Debe cambiar el estado a checking', () => {
      
        const state = authSlice.reducer( initialState, checkingCredentials() );

        expect( state.status ).toBe('checking');

    })
    
    

});

