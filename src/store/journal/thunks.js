import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { addNewEmptyNote, setActiveNote, savingNewNote, setNotes} from './';
import { loadNotes } from '../../helpers/loadNotes';


export const startNewNote = () => {

    return async( dispatch, getState ) => {

        dispatch( savingNewNote() );

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        //Primero creamos la referencia al documento en Firestore
        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes` ) );
        //Luego guardamos el documento en Firestore
        await setDoc( newDoc, newNote );
        //Luego asignamos el id del documento al objeto newNote
        newNote.id = newDoc.id;
        //Luego despachamos la acción
        dispatch( addNewEmptyNote( newNote ) );
        //activamos la nota
        dispatch( setActiveNote( newNote ) );

    }

};

export const startLoadingNotes = () => {

    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        if( !uid ) throw new Error('El UID del usuario no está definido');

        const notes = await loadNotes( uid );

        dispatch( setNotes( notes ) );
    }

};

