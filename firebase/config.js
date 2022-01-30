import { initializeApp } from "firebase/app";

//авторизация
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDw_dAeRDuzq0A-iPnDu2w3nhfZapYe91s",
  authDomain: "rn-project-dcf9a.firebaseapp.com",
  projectId: "rn-project-dcf9a",
  storageBucket: "rn-project-dcf9a.appspot.com",
  messagingSenderId: "657005245026",
  appId: "1:657005245026:web:23750b2b396fa94e35573b",
  measurementId: "G-LVLLWJ1FJT",
};

const app = initializeApp(firebaseConfig);

const authKey = getAuth(app);

export {
  authKey,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
};
