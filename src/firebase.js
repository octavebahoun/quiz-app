// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHldcK5C0Z1LVpI0zcsVyJ_Y1Hr1-0eaI",
  authDomain: "app-quiz-758e0.firebaseapp.com",
  projectId: "app-quiz-758e0",
  storageBucket: "app-quiz-758e0.firebasestorage.app",
  messagingSenderId: "616690093312",
  appId: "1:616690093312:web:4161880eba2602c4a7b7e5",
  measurementId: "G-KJ8NEJCD1S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
