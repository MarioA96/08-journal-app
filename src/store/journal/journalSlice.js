

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
        deleteNoteById: (state, action) => {
            // Funcion pura sincrona
        },
    }
});


// Action creators are generated for each case reducer function
export const { 
    savingNewNote,
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    noteUpdated,
    deleteNoteById
 } = journalSlice.actions;
