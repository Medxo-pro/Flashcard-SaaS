import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

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
const db = getFirestore(app);
export default db;