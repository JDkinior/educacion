// Importar funciones necesarias de Firebase y Firestore
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore, doc, setDoc, getDocs, updateDoc, deleteDoc, getDoc, collection } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC6KxCX-APw_PSp27pxeKIvFAtQKfB6-pc",
    authDomain: "ecomerce-c17d0.firebaseapp.com",
    projectId: "ecomerce-c17d0",
    storageBucket: "ecomerce-c17d0.appspot.com",
    messagingSenderId: "119722744036",
    appId: "1:119722744036:web:79c5c6420f0622ecaab4f1",
    measurementId: "G-017ZMYZD81"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
const db = getFirestore(app);

// Función para agregar un estudiante
async function addStudent(studentId, firstName, lastName, email) {
    try {
        await setDoc(doc(db, "students", studentId), {
            id: studentId,
            firstName: firstName,
            lastName: lastName,
            email: email
        });
        console.log("Estudiante agregado exitosamente");
        loadStudents(); // Recargar lista de estudiantes
    } catch (e) {
        console.error("Error al agregar estudiante: ", e);
    }
}

// Función para cargar lista de estudiantes
async function loadStudents() {
    const studentList = document.getElementById('student-list');
    studentList.innerHTML = ''; // Limpiar la lista

    try {
        const querySnapshot = await getDocs(collection(db, "students"));
        querySnapshot.forEach((doc) => {
            const student = doc.data();
            const li = document.createElement('li');
            li.textContent = `${student.id}: ${student.firstName} ${student.lastName} (${student.email})`;
            studentList.appendChild(li);
        });
    } catch (error) {
        console.error("Error al cargar estudiantes: ", error);
    }
}

// Función para buscar un estudiante
document.getElementById('search-btn').addEventListener('click', async function () {
    const studentId = document.getElementById('search-id').value;
    const searchResult = document.getElementById('search-result');
    searchResult.innerHTML = ''; // Limpiar resultados anteriores

    try {
        const docSnap = await getDoc(doc(db, "students", studentId));
        if (docSnap.exists()) {
            const student = docSnap.data();
            searchResult.textContent = `Encontrado: ${student.id}: ${student.firstName} ${student.lastName} (${student.email})`;
        } else {
            searchResult.textContent = "No se encontró el estudiante";
        }
    } catch (error) {
        console.error("Error al buscar estudiante: ", error);
    }
});

// Función para actualizar un estudiante
document.getElementById('update-btn').addEventListener('click', async function () {
    const studentId = document.getElementById('update-id').value;
    const firstName = document.getElementById('update-first-name').value;
    const lastName = document.getElementById('update-last-name').value;
    const email = document.getElementById('update-email').value;

    try {
        const studentRef = doc(db, "students", studentId);
        await updateDoc(studentRef, {
            firstName: firstName,
            lastName: lastName,
            email: email
        });
        console.log("Estudiante actualizado exitosamente");
        loadStudents(); // Recargar lista de estudiantes
    } catch (e) {
        console.error("Error al actualizar estudiante: ", e);
    }
});

// Función para eliminar un estudiante
document.getElementById('delete-btn').addEventListener('click', async function () {
    const studentId = document.getElementById('delete-id').value;

    try {
        await deleteDoc(doc(db, "students", studentId));
        console.log("Estudiante eliminado exitosamente");
        loadStudents(); // Recargar lista de estudiantes
    } catch (e) {
        console.error("Error al eliminar estudiante: ", e);
    }
});

// Cargar lista de estudiantes al cargar la página
window.onload = loadStudents;
