import { collection, getDocs } from "firebase/firestore/lite";
import { firebaseDB } from "../firebase";

export const getNotes = async( uid = '' ) => {

    if (!uid) throw new Error('El uid del usuario no existe');
    
    const querySnapshot  = await getDocs(collection(firebaseDB, `${uid}/journal/notes`));
    
    const notes = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
    }));
    
    return notes;
};