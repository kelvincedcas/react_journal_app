import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { firebaseDB } from "../../firebase";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setIsSaving, setNotes, setPhotosToActiveNote, setPhotosToNotes, updatedNote } from "./journalSlice";
import { fileUpload, getNotes } from "../../helpers";

export const startNewNote = () => {
    return async(dispatch, getState) => {

        dispatch(savingNewNote());
        
        const {uid} = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imagesURLs: [],
        };

        const refDoc = doc(collection(firebaseDB, `${uid}/journal/notes`));
        
        // insertar la nota en firestore
        await setDoc(refDoc, newNote);

        // asignarle el id a la nota

        newNote.id = refDoc.id;

        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
    };
};

export const startGetNotes = () => {
    return async(dispatch, getState) => {
        
        const {uid} = getState().auth;

        if (!uid) throw new Error('El uid del usuario no existe');

        const notes = await getNotes(uid);
        
        // console.log(notes);

        dispatch(setNotes(notes));

    };
};

export const startUpdateNote = () => {
    return async(dispatch, getState) => {

        dispatch(setIsSaving());

        const {uid} = getState().auth;

        const {activeNote} = getState().journal;

        const noteToFirebase = {...activeNote};
        delete noteToFirebase.id;

        const docRef = doc(firebaseDB, `${uid}/journal/notes/${activeNote.id}`);
        await setDoc(docRef, noteToFirebase);

        // colocar en el state de redux la nota actualizada
        const messageSaved = `All changes made to "${activeNote.title || 'the note'}" were updated successfully.`;
        dispatch(updatedNote({activeNote, messageSaved}));
        
    };
};

export const startUploadingFiles = (files = []) => {
    return async(dispatch, getState) => {
        dispatch(setIsSaving());

        const filesUploadPromises = [];

        for (const file of files) {
            filesUploadPromises.push(fileUpload(file));
        }
        
        const photosUrls = await Promise.all(filesUploadPromises);
        
        // colocar el arreglo de fotos en la nota activa
        dispatch(setPhotosToActiveNote(photosUrls));
        
        // grabar en firebase el nuevo arreglo de fotos
        const {uid} = getState().auth;
        
        const {activeNote} = getState().journal;
        
        const noteToFirebase = {...activeNote};
        delete noteToFirebase.id;
        
        const docRef = doc(firebaseDB, `${uid}/journal/notes/${activeNote.id}`);
        await setDoc(docRef, noteToFirebase);
        
        // actualizar en redux el arreglo de fotos de la nota
        // colocar en el state de redux la nota actualizada
        const messageSaved = `All selected files were uploaded successfully.`;
        dispatch(updatedNote({activeNote, messageSaved}));
    };
};

export const startDeleteNote = () => {
    return async(dispatch, getState) => {

        dispatch(setIsSaving());

        const {uid} = getState().auth;

        const {id:noteId} = getState().journal.activeNote;

        try {
            const docRef = doc(firebaseDB, `${uid}/journal/notes/${noteId}`)
            await deleteDoc(docRef);
            dispatch(deleteNoteById(noteId))
        } catch (error) {
            console.log(error);
        }

    };
};