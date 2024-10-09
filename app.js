// Importar las funciones necesarias de Firebase
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, update, get, child, remove } from "firebase/database"; // Importar funciones de Firebase Database

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC6KxCX-APw_PSp27pxeKIvFAtQKfB6-pc",
  authDomain: "ecomerce-c17d0.firebaseapp.com",
  projectId: "ecomerce-c17d0",
  storageBucket: "ecomerce-c17d0.appspot.com",
  messagingSenderId: "119722744036",
  appId: "1:119722744036:web:79c5c6420f0622ecaab4f1",
  measurementId: "G-017ZMYZD81",
  databaseURL: "https://ecomerce-c17d0-default-rtdb.firebaseio.com/"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Función para agregar un estudiante
function addStudent(studentId, firstName, lastName, email) {
  const studentRef = ref(database, 'students/' + studentId);
  set(studentRef, {
    id: studentId,
    firstName: firstName,
    lastName: lastName,
    email: email
  })
  .then(() => {
    console.log("Estudiante agregado exitosamente");
    loadStudents(); // Cargar la lista de estudiantes después de agregar
  })
  .catch((error) => {
    console.error("Error al agregar estudiante: ", error);
  });
}

// Función para cargar la lista de estudiantes
function loadStudents() {
  const studentList = document.getElementById('student-list');
  studentList.innerHTML = ''; // Limpiar la lista

  get(ref(database, 'students')).then((snapshot) => {
    if (snapshot.exists()) {
      const students = snapshot.val();
      for (let id in students) {
        const student = students[id];
        const li = document.createElement('li');
        li.textContent = `${student.id}: ${student.firstName} ${student.lastName} (${student.email})`;
        studentList.appendChild(li);
      }
    } else {
      console.log("No hay estudiantes registrados");
    }
  }).catch((error) => {
    console.error("Error al cargar estudiantes: ", error);
  });
}

// Función para buscar un estudiante
document.getElementById('search-btn').addEventListener('click', function() {
  const studentId = document.getElementById('search-id').value;
  const searchResult = document.getElementById('search-result');
  searchResult.innerHTML = ''; // Limpiar resultado anterior

  get(child(ref(database), `students/${studentId}`)).then((snapshot) => {
    if (snapshot.exists()) {
      const student = snapshot.val();
      searchResult.textContent = `Encontrado: ${student.id}: ${student.firstName} ${student.lastName} (${student.email})`;
    } else {
      searchResult.textContent = "No se encontró el estudiante";
    }
  }).catch((error) => {
    console.error("Error al buscar estudiante: ", error);
  });
});

// Función para actualizar un estudiante
document.getElementById('update-btn').addEventListener('click', function() {
  const studentId = document.getElementById('update-id').value;
  const firstName = document.getElementById('update-first-name').value;
  const lastName = document.getElementById('update-last-name').value;
  const email = document.getElementById('update-email').value;

  update(ref(database, 'students/' + studentId), {
    firstName: firstName,
    lastName: lastName,
    email: email
  })
  .then(() => {
    console.log("Estudiante actualizado exitosamente");
    loadStudents(); // Cargar la lista de estudiantes después de actualizar
  })
  .catch((error) => {
    console.error("Error al actualizar estudiante: ", error);
  });
});

// Función para eliminar un estudiante
document.getElementById('delete-btn').addEventListener('click', function() {
  const studentId = document.getElementById('delete-id').value;
  
  remove(ref(database, 'students/' + studentId))
  .then(() => {
    console.log("Estudiante eliminado exitosamente");
    loadStudents(); // Cargar la lista de estudiantes después de eliminar
  })
  .catch((error) => {
    console.error("Error al eliminar estudiante: ", error);
  });
});

// Cargar la lista de estudiantes al cargar la página
window.onload = loadStudents;
