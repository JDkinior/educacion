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

// Función para agregar un estudiante
const addStudentForm = document.getElementById('add-student-form');
addStudentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const studentId = document.getElementById('student-id').value;
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;

    console.log("Datos del estudiante:", studentId, firstName, lastName, email); // Agrega este console.log

    try {
        await addDoc(collection(db, "estudiantes"), {
            id: studentId,
            firstName: firstName,
            lastName: lastName,
            email: email
        });
        alert('Estudiante agregado');
    } catch (error) {
        console.error("Error al agregar estudiante: ", error);
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
    const querySnapshot = await getDocs(collection(db, "estudiantes"));
    const resultDiv = document.getElementById('search-result');
    resultDiv.innerHTML = ''; // Limpiar resultados previos

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

    const querySnapshot = await getDocs(collection(db, "estudiantes"));
    querySnapshot.forEach(async (docSnap) => {
        if (docSnap.data().id === updateId) {
            const docRef = doc(db, "estudiantes", docSnap.id);
            await updateDoc(docRef, {
                firstName: updateFirstName,
                lastName: updateLastName,
                email: updateEmail
            });
            alert('Estudiante actualizado');
        }
    });
});

// Función para eliminar un estudiante
const deleteBtn = document.getElementById('delete-btn');
deleteBtn.addEventListener('click', async () => {
    const deleteId = document.getElementById('delete-id').value;

    const querySnapshot = await getDocs(collection(db, "estudiantes"));
    querySnapshot.forEach(async (docSnap) => {
        if (docSnap.data().id === deleteId) {
            const docRef = doc(db, "estudiantes", docSnap.id);
            await deleteDoc(docRef);
            alert('Estudiante eliminado');
        }
    });
});