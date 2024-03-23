import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { addNewEmptyNote, setActiveNote, savingNewNote, setNotes, setSaving, noteUpdated} from './';
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

export const startSavingNote = () => {

    return async( dispatch, getState ) => {
        
        dispatch( setSaving() );

        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const noteToFireStore = { ...note };
        delete noteToFireStore.id;

        // console.log(noteToFireStore);
        // Esto es para que no se guarde el id en el objeto que se guarda en Firestore
        //TODO Las sig lineas se deberian envolver en un try catch
        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` );
        await setDoc( docRef, noteToFireStore, { merge: true } );

        dispatch( noteUpdated( note ) );
    };

};