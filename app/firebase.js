// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmIP6ttiSP0hxAdxfGQSJJR82EZjL-PZ4",
  authDomain: "flashcard-saas-f76cf.firebaseapp.com",
  projectId: "flashcard-saas-f76cf",
  storageBucket: "flashcard-saas-f76cf.appspot.com",
  messagingSenderId: "973963384168",
  appId: "1:973963384168:web:12650c525b82043ebfb2dd",
  measurementId: "G-CWBNK284YE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)

export{db}