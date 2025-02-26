import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDet2ddyl5fxjczjMHwEuyJhTViXIqdmt0",
  authDomain: "vehicle-vault-1e1bd.firebaseapp.com",
  projectId: "vehicle-vault-1e1bd",
  storageBucket: "vehicle-vault-1e1bd.appspot.com",
  messagingSenderId: "842991560848",
  appId: "1:842991560848:web:16247d7dcc24fdf6565015",
  measurementId: "G-Y25KFGGRFP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
