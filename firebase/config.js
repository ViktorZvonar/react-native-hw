import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBM9TLekIicX9_nEft6fFeLU1DX3tTeX1Y",
  authDomain: "reactnative-social-70e21.firebaseapp.com",
  projectId: "reactnative-social-70e21",
  storageBucket: "reactnative-social-70e21.appspot.com",
  messagingSenderId: "257414200024",
  appId: "1:257414200024:web:743201cd6a90c0971cb5ad",
  measurementId: "G-LVJQ0624NX",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
