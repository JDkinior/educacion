// Archivo: /backend/firebaseConfig.js

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
const db = firebase.firestore();