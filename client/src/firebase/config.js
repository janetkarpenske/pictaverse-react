import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "react-app-36640.firebaseapp.com",
  projectId: "react-app-36640",
  storageBucket: "react-app-36640.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: "G-6RLQ650M8K"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth(app);

export { db, auth }