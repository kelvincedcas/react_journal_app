import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        activeNote: null,
    },
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload);
            state.isSaving = false;
            state.messageSaved = '';
        },
        setActiveNote: (state, action) => {
            state.activeNote = action.payload;
            state.messageSaved = '';
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
            state.messageSaved = '';
        },
        setIsSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        updatedNote: (state, {payload}) => {
            state.isSaving = false;
            state.messageSaved = payload.messageSaved;
            state.notes = state.notes.map(note => {
                if (note.id === payload.activeNote.id) return payload.activeNote;
                return note;
            });
        },
        setPhotosToActiveNote: (state, {payload}) => {
            state.activeNote.imagesURLs = [...state.activeNote.imagesURLs, ...payload];
            state.isSaving = false;
        },
        clearNotesLogout: (state) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.activeNote = null;
        },
        deleteNoteById: (state, {payload}) => {
            state.isSaving = false;
            state.activeNote = null;
            state.notes = state.notes.filter(note => note.id !== payload);
        },
    }
});


// Action creators are generated for each case reducer function
export const { 
    savingNewNote,
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setIsSaving,
    updatedNote,
    deleteNoteById, 
    setPhotosToActiveNote,
    setPhotosToNotes,
    clearNotesLogout,
} = journalSlice.actions;