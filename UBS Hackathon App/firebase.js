// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgYU3TM40ggiiMcHBZQdmpIrQ1u5DCBo4",
  authDomain: "swachhsanket.firebaseapp.com",
  projectId: "swachhsanket",
  storageBucket: "swachhsanket.appspot.com",
  messagingSenderId: "318350743684",
  appId: "1:318350743684:web:7bc2b21c5aab26dc424ad1",
  measurementId: "G-G3V16CT664"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig)
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)
export const FIRESTORE_DB = getFirestore(FIREBASE_APP)