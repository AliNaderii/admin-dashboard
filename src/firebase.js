import { initializeApp } from "firebase/app";
import { getFirestore, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBeFPiy4gB-y-BM-xLNXtR4FaOXd3p_9jc',
  authDomain: "admin-dashboard-9cd23.firebaseapp.com",
  projectId: "admin-dashboard-9cd23",
  storageBucket: "admin-dashboard-9cd23.appspot.com",
  messagingSenderId: "224331024706",
  appId: "1:224331024706:web:5b50c43829b0d22a43a0db"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// init service
const db = getFirestore(app);
export const auth = getAuth();
// collection ref
export const colRef = collection(db, 'users');

