// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// // Функція для підключення сховища файлів в проект
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
