import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, onSnapshot, query, where, deleteDoc, doc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-X5bIX1WJuSOD8Weu74V5SrFNogcVHAo",
  authDomain: "todolisteveron.firebaseapp.com",
  projectId: "todolisteveron",
  storageBucket: "todolisteveron.firebasestorage.app",
  messagingSenderId: "841911847868",
  appId: "1:841911847868:web:7bed0e506a4844c73bf9b9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, GoogleAuthProvider, signInWithPopup, signOut, db, collection, addDoc, getDocs, onSnapshot, query, where, deleteDoc, doc };