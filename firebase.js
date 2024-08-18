// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAp3JmpKyxmTXthV10wDQFp19IOl-OaTqQ",
  authDomain: "flashcard-saas-b5063.firebaseapp.com",
  projectId: "flashcard-saas-b5063",
  storageBucket: "flashcard-saas-b5063.appspot.com",
  messagingSenderId: "182062787126",
  appId: "1:182062787126:web:de1e0054bc7ee19dd98697",
  measurementId: "G-XYSPM8F6SH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export{db}