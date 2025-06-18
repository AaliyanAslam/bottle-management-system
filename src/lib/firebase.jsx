
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxaqK0i0UHaV0cDSJzF3y-9HBn-6E9d7c",
  authDomain: "bottles-management.firebaseapp.com",
  projectId: "bottles-management",
  storageBucket: "bottles-management.firebasestorage.app",
  messagingSenderId: "848398908351",
  appId: "1:848398908351:web:0000a30ec0c9df04ec7f0a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };