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

// Manejar el formulario de agregar estudiante
const addStudentForm = document.getElementById('add-student-form');
addStudentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;

    try {
        await db.collection('estudiantes').add({
            firstName,
            lastName,
            email
        });
        document.getElementById('student-message').innerText = 'Estudiante agregado exitosamente.';
        addStudentForm.reset();
    } catch (error) {
        document.getElementById('student-message').innerText = 'Error al agregar estudiante: ' + error.message;
    }
});

// Manejar el formulario de agregar profesor
const addTeacherForm = document.getElementById('add-teacher-form');
addTeacherForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const firstName = document.getElementById('teacher-first-name').value;
    const lastName = document.getElementById('teacher-last-name').value;
    const email = document.getElementById('teacher-email').value;

    try {
        await db.collection('profesores').add({
            firstName,
            lastName,
            email
        });
        document.getElementById('teacher-message').innerText = 'Profesor agregado exitosamente.';
        addTeacherForm.reset();
    } catch (error) {
        document.getElementById('teacher-message').innerText = 'Error al agregar profesor: ' + error.message;
    }
});

// Función para listar estudiantes en tiempo real
function listStudentsRealtime() {
    db.collection('estudiantes').onSnapshot((snapshot) => {
        const studentList = document.getElementById('student-list');
        studentList.innerHTML = '';
        snapshot.forEach((doc) => {
            const student = doc.data();
            const li = document.createElement('li');
            li.textContent = `ID: ${doc.id}, Nombres: ${student.firstName}, Apellidos: ${student.lastName}, Email: ${student.email}`;
            studentList.appendChild(li);
        });
    });
}

// Función para listar profesores en tiempo real
function listTeachersRealtime() {
    db.collection('profesores').onSnapshot((snapshot) => {
        const teacherList = document.getElementById('teacher-list');
        teacherList.innerHTML = '';
        snapshot.forEach((doc) => {
            const teacher = doc.data();
            const li = document.createElement('li');
            li.textContent = `ID: ${doc.id}, Nombres: ${teacher.firstName}, Apellidos: ${teacher.lastName}, Email: ${teacher.email}`;
            teacherList.appendChild(li);
        });
    });
}

// Llamar a las funciones de listar estudiantes y profesores cuando se carga la página
window.onload = function() {
    listStudentsRealtime();
    listTeachersRealtime();
};
