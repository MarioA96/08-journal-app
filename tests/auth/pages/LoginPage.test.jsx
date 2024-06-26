import { fireEvent, render, screen } from "@testing-library/react";

import { Provider } from "react-redux";
import { configureStore } from '@reduxjs/toolkit';

import { MemoryRouter } from "react-router-dom";

import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { authSlice } from "../../../src/store/auth";

import { notAuthenticatedState } from "../../fixtures/authFixtures";


const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startLoginWithEmailPassword: ({ email, password }) => {
        return () => mockStartLoginWithEmailPassword({ email, password })
    },

}));

// Solo queremos sobreescribir el comportamiento de useDispatch
// Podemos sobreescribir el comportamiento de useSelector si lo necesitamos
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) => fn(),

}) )

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState: {
        auth: notAuthenticatedState
    }
});

describe('Pruebas en el <LoginPage/>', () => {

    beforeEach( () => jest.clearAllMocks() );

    test('Debe de mostrar el componente correctamente', () => {

        render(
            <Provider store={store}>
                {/* 
                    Debemos agregar memoryrouter porque manjeamos rutas
                    y evitamos el error de basename ...context()
                    o el error de href
                */}
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        // screen.debug();
        expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);

    });

    test('Boton de google debe de llamar el startGoogleSignIn', () => {

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const googleBtn = screen.getByLabelText('google-btn');

        // Sin el preloadState, el boton aparece como deshabilitado por defecto
        fireEvent.click(googleBtn);
        expect(mockStartGoogleSignIn).toHaveBeenCalled();

    });

    test('Submit debe de llamar startLoginWithEmailPassword', () => {

        const email = 'marioa@dominio.com';
        const password = '123456';

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const emailField = screen.getByRole('textbox', { name: 'Correo' });
        fireEvent.change( emailField, { target: {  name: 'email', value: email } });

        //Tuvimos que hacer esto porque MUI maneja de forma distinta los input textbox de los input password
        //asi que desde LoginPage.jsx le agregamos un data-testid al input password
        const passwordField = screen.getByTestId('password');
        fireEvent.change( passwordField, { target: {  name: 'password', value: password } });

        const loginForm = screen.getByLabelText('submit-form');
        fireEvent.submit( loginForm );

        expect( mockStartLoginWithEmailPassword ).toHaveBeenCalledWith({
            email, 
            password
        });

    })

    test('Deben de registrar usuario startCreatingUserWithEmailPassword', () => {

        

    })
    


});

