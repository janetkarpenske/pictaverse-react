import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "vue-vet-portal.firebaseapp.com",
  projectId: "vue-vet-portal",
  storageBucket: "vue-vet-portal.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

initializeApp(firebaseConfig);

const DB = getFirestore();
const auth = getAuth();

export { DB, auth }