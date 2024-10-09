// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, update, get, child, remove } from "firebase/database"; // Importar funciones de Firebase Database

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6KxCX-APw_PSp27pxeKIvFAtQKfB6-pc",
  authDomain: "ecomerce-c17d0.firebaseapp.com",
  projectId: "ecomerce-c17d0",
  storageBucket: "ecomerce-c17d0.appspot.com",
  messagingSenderId: "119722744036",
  appId: "1:119722744036:web:79c5c6420f0622ecaab4f1",
  measurementId: "G-017ZMYZD81",
  databaseURL: "https://ecomerce-c17d0-default-rtdb.firebaseio.com/" // Añadir databaseURL
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Database
const database = getDatabase(app);

// Función para agregar un estudiante a la base de datos
function addStudent(studentId, firstName, lastName, email) {
  const studentRef = ref(database, 'students/' + studentId); // Referencia a la ruta del estudiante
  set(studentRef, {
    id: studentId,
    firstName: firstName,
    lastName: lastName,
    email: email
  })
  .then(() => {
    console.log("Estudiante agregado exitosamente");
  })
  .catch((error) => {
    console.error("Error al agregar estudiante: ", error);
  });
}
