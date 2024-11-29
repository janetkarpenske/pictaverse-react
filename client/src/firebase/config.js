import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCOc5PXdi8WjEOl8ZfPb4C92yKgkIKcYc4",
  authDomain: "react-app-36640.firebaseapp.com",
  projectId: "react-app-36640",
  storageBucket: "react-app-36640.firebasestorage.app",
  messagingSenderId: "976120151755",
  appId: "1:976120151755:web:8da62da32597e04b44254e",
  measurementId: "G-6RLQ650M8K"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth(app);

export { db, auth }