// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // <-- Importamos Firestore

const firebaseConfig = {
  apiKey: "AIzaSyCt29yV9buvKWH2PL6g5LuFXmuYXvLWUP8",
  authDomain: "pronosticosmundial-ec19b.firebaseapp.com",
  projectId: "pronosticosmundial-ec19b",
  storageBucket: "pronosticosmundial-ec19b.firebasestorage.app",
  messagingSenderId: "345426358239",
  appId: "1:345426358239:web:1aa3eda41108c354ac1e6a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Exportamos la instancia de la base de datos para usarla en la app
export const db = getFirestore(app);