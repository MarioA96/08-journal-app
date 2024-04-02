import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { addNewEmptyNote, savingNewNote, setActiveNote } from "../../../src/store/journal/journalSlice";
import { startNewNote } from "../../../src/store/journal/thunks";
import { FirebaseDB } from "../../../src/firebase/config";

describe('Pruebas en Journal Thunks', () => {

    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach(() => {
        dispatch.mockClear();
    });

    test('Debe de crea una nueva nota en blanco', async() => {
      
        const uid = 'TEST-UID';
        getState.mockReturnValue({
            auth: {
                uid: uid
            }
        });
        //Recuerda, el primer parentesis es para ejecutar la función startNewNote()
        //El segundo parentesis es para el de retorno return async() => {}
        await startNewNote()( dispatch, getState );

        expect( dispatch ).toHaveBeenCalledWith( savingNewNote() );
        expect( dispatch ).toHaveBeenCalledWith( addNewEmptyNote({ 
            title: "",
            body: "",
            imageUrls: [],
            id: expect.any(String),
            date: expect.any(Number)
         }) );
         expect( dispatch ).toHaveBeenCalledWith( setActiveNote({ 
            title: "",
            body: "",
            imageUrls: [],
            id: expect.any(String),
            date: expect.any(Number)
         }) );

         // Borrar de Firebase
        const collectionref = collection( FirebaseDB, `${ uid }/journal/notes` );
        const docs = await getDocs( collectionref );

        const deletePromises = [];
        docs.forEach( doc => {
            deletePromises.push( deleteDoc( doc.ref ) );
        });
        await Promise.all( deletePromises );

    });

    //? Hacer las demás pruebas
    

});

