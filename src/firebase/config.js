// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDv6bYQP1Rwf9O54qddwdKSEv3xus_s3oM",
  authDomain: "react-curso-3b6b9.firebaseapp.com",
  projectId: "react-curso-3b6b9",
  storageBucket: "react-curso-3b6b9.appspot.com",
  messagingSenderId: "266094334644",
  appId: "1:266094334644:web:0aa07857360b4b08a67de1"
};

// Initialize Firebase
export const FirebaseApp = initializeApp( firebaseConfig );
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );