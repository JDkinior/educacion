// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7yepF-8cAVkQJfCi3ClmfpDldU0GzbbM",
  authDomain: "educacion-1225b.firebaseapp.com",
  projectId: "educacion-1225b",
  storageBucket: "educacion-1225b.appspot.com",
  messagingSenderId: "965775350789",
  appId: "1:965775350789:web:2d70b680a8e07c09c6506c",
  measurementId: "G-TLVMR2BXQP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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
        await db.collection("estudiantes").add({
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
    const querySnapshot = await db.collection("estudiantes").get();
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

    const querySnapshot = await db.collection("estudiantes").get();
    querySnapshot.forEach((doc) => {
        if (doc.data().id === searchId) {
            resultDiv.textContent = `${doc.data().firstName} ${doc.data().lastName} - ${doc.data().email}`;
        }
    });
});

// Función para actualizar un estudiante
const updateBtn = document.getElementById('update-btn');
updateBtn.addEventListener('click', async () => {
    const updateId = document.getElementById('update-id').value;
    const updateFirstName = document.getElementById('update-first-name').value;
    const updateLastName = document.getElementById('update-last-name').value;
    const updateEmail = document.getElementById('update-email').value;

    const querySnapshot = await db.collection("estudiantes").get();
    querySnapshot.forEach(async (docSnap) => {
        if (docSnap.data().id === updateId) {
            const docRef = db.collection("estudiantes").doc(docSnap.id);
            await docRef.update({
                firstName: updateFirstName,
                lastName: updateLastName,
                email: updateEmail
            });
            messageDiv.style.color = 'green';
            messageDiv.textContent = `Estudiante actualizado correctamente.`;
        }
    });
});

// Función para eliminar un estudiante
const deleteBtn = document.getElementById('delete-btn');
deleteBtn.addEventListener('click', async () => {
    const deleteId = document.getElementById('delete-id').value;

    const querySnapshot = await db.collection("estudiantes").get();
    querySnapshot.forEach(async (docSnap) => {
        if (docSnap.data().id === deleteId) {
            const docRef = db.collection("estudiantes").doc(docSnap.id);
            await docRef.delete();
            messageDiv.style.color = 'green';
            messageDiv.textContent = `Estudiante eliminado correctamente.`;
        }
    });
});