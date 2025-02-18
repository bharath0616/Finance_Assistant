// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// eslint-disable-next-line no-unused-vars
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  /*   apiKey: import.meta.env.VITE_FIREBASE_API_KEY , */
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "projectpfa-c01e4.firebaseapp.com",
    projectId: "projectpfa-c01e4",
    storageBucket: "projectpfa-c01e4.appspot.com",
    messagingSenderId: "390546479983",
    appId: "1:390546479983:web:9454a4de0fbd1a018c669a",
    measurementId: "G-T1XF34YEJ8"
  };

// Initialize Firebase


export const app=initializeApp(firebaseConfig)