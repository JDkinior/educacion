// Archivo: /backend/firebaseConfig.js

// Importa las dependencias necesarias de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";

// Inicialización de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA7yepF-8cAVkQJfCi3ClmfpDldU0GzbbM",
    authDomain: "educacion-1225b.firebaseapp.com",
    databaseURL: "https://educacion-1225b-default-rtdb.firebaseio.com",
    projectId: "educacion-1225b",
    storageBucket: "educacion-1225b.appspot.com",
    messagingSenderId: "965775350789",
    appId: "1:965775350789:web:af28339485696e84c6506c",
    measurementId: "G-NSXK8QQ63H"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Inicializar Firestore


// Inicializa Firestore y exporta la referencia a la base de datos
export const db = getFirestore(app);