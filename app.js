// Importar las funciones necesarias de Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, getDocs, query, where, updateDoc, doc, deleteDoc } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA7yepF-8cAVkQJfCi3ClmfpDldU0GzbbM",
    authDomain: "educacion-1225b.firebaseapp.com",
    databaseURL: "https://educacion-1225b-default-rtdb.firebaseio.com",
    projectId: "educacion-1225b",
    storageBucket: "educacion-1225b.appspot.com",
    messagingSenderId: "965775350789",
    appId: "1:965775350789:web:0f94dad5e1e8fed1c6506c",
    measurementId: "G-QKMXY3BJ76"
  };
// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);  // Instancia de Firestore

// Div para mostrar los mensajes
const messageDiv = document.getElementById('message');

// Función para agregar un estudiante
const addStudentForm = document.getElementById('add-student-form');
addStudentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const studentId = document.getElementById('student-id').value;
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;

    try {
        // Agregar el documento a la colección "estudiantes"
        await addDoc(collection(db, "estudiantes"), {
            id: studentId,
            firstName: firstName,
            lastName: lastName,
            email: email
        });

        // Mostrar mensaje de éxito
        messageDiv.style.color = 'green';
        messageDiv.textContent = `El estudiante ${firstName} ${lastName} ha sido agregado correctamente.`;
        addStudentForm.reset(); // Limpiar el formulario
    } catch (error) {
        // Mostrar mensaje de error
        messageDiv.style.color = 'red';
        messageDiv.textContent = `Error al agregar el estudiante: ${error.message}`;
    }
});

// Función para listar estudiantes
const studentList = document.getElementById('student-list');
async function getStudents() {
    const querySnapshot = await getDocs(collection(db, "estudiantes"));
    studentList.innerHTML = ''; // Limpiar la lista
    querySnapshot.forEach((doc) => {
        const li = document.createElement('li');
        li.textContent = `${doc.data().id}: ${doc.data().firstName} ${doc.data().lastName} - ${doc.data().email}`;
        studentList.appendChild(li);
    });
}
getStudents(); // Cargar estudiantes al cargar la página

// Función para buscar un estudiante
const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', async () => {
    const searchId = document.getElementById('search-id').value;
    const resultDiv = document.getElementById('search-result');
    resultDiv.innerHTML = ''; // Limpiar resultados previos

    const querySnapshot = await getDocs(query(collection(db, "estudiantes"), where("id", "==", searchId)));
    querySnapshot.forEach((doc) => {
        resultDiv.textContent = `${doc.data().firstName} ${doc.data().lastName} - ${doc.data().email}`;
    });
});

// Función para actualizar un estudiante
const updateBtn = document.getElementById('update-btn');
updateBtn.addEventListener('click', async () => {
    const updateId = document.getElementById('update-id').value;
    const updateFirstName = document.getElementById('update-first-name').value;
    const updateLastName = document.getElementById('update-last-name').value;
    const updateEmail = document.getElementById('update-email').value;

    const querySnapshot = await getDocs(query(collection(db, "estudiantes"), where("id", "==", updateId)));
    querySnapshot.forEach(async (docSnap) => {
        const docRef = doc(db, "estudiantes", docSnap.id);
        await updateDoc(docRef, {
            firstName: updateFirstName,
            lastName: updateLastName,
            email: updateEmail
        });
        messageDiv.style.color = 'green';
        messageDiv.textContent = `Estudiante actualizado correctamente.`;
    });
});

// Función para eliminar un estudiante
const deleteBtn = document.getElementById('delete-btn');
deleteBtn.addEventListener('click', async () => {
    const deleteId = document.getElementById('delete-id').value;

    const querySnapshot = await getDocs(query(collection(db, "estudiantes"), where("id", "==", deleteId)));
    querySnapshot.forEach(async (docSnap) => {
        const docRef = doc(db, "estudiantes", docSnap.id);
        await deleteDoc(docRef);
        messageDiv.style.color = 'green';
        messageDiv.textContent = `Estudiante eliminado correctamente.`;
    });
});
