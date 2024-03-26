

import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
        // active: {
        //     id: 'ABCDE12345',
        //     title: '',
        //     body: '',
        //     date: 1234567,
        //     imageUrls: [], // ['url1', 'url2']
        // },
    },
    reducers: {
        savingNewNote: (state) => {
            // Funcion pura sincrona
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => {
            // Funcion pura sincrona
            //Recordando de que puedo hace mutacion porque estoy usando Redux Toolkit
            //Caso contario deberia hacer una copia del estado y retornarla
            //o usar la libreria Immer o [...] para hacer una copia del estado
            state.notes.push( action.payload );
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            // Funcion pura sincrona
            state.active = action.payload;
            state.messageSaved = '';
        },
        setNotes: (state, action) => {
            // Funcion pura sincrona
            state.notes = action.payload;
        },
        setSaving: (state) => {
            // Funcion pura sincrona
            state.isSaving = true;
            state.messageSaved = '';
        },
        noteUpdated: (state, action) => { // payload: note
            // Funcion pura sincrona
            state.isSaving = false;
            state.notes = state.notes.map( 
                note => note.id === action.payload.id 
                        ? action.payload 
                        : note 
            );

            state.messageSaved = `${ action.payload.title }, actualizada correctamente`;
        },
        setPhotosToActiveNote: (state, action) => {
            state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload ];
            state.isSaving = false;
        },
        clearNotesLogout: (state) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.active = null;
        },
        deleteNoteById: (state, action) => {
            // Funcion pura sincrona
            state.active = null;
            state.notes = state.notes.filter( note => note.id !== action.payload );
        },
    }
});


// Action creators are generated for each case reducer function
export const { 
    addNewEmptyNote,
    clearNotesLogout,
    deleteNoteById,
    noteUpdated,
    savingNewNote,
    setActiveNote,
    setNotes,
    setPhotosToActiveNote,
    setSaving,
 } = journalSlice.actions;
