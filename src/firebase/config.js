// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCM3UdOpB0dBNi8TkWOOLAKyP1UiMKj_-s",
  authDomain: "journal-app-b7a74.firebaseapp.com",
  projectId: "journal-app-b7a74",
  storageBucket: "journal-app-b7a74.firebasestorage.app",
  messagingSenderId: "955660855205",
  appId: "1:955660855205:web:cdfb2c437e6dcaff57ea4c"
};

// Initialize Firebase
export const firebaseApp = initializeApp( firebaseConfig );

export const firebaseAuth = getAuth( firebaseApp );
export const firebaseDB = getFirestore( firebaseApp );