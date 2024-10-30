// Importar Firebase y configurar autenticación
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '/backend/firebaseConfig.js';

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Registro de usuario
document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('Usuario registrado con éxito');
    } catch (error) {
        console.error('Error en el registro:', error.message);
        alert('Error en el registro: ' + error.message);
    }
});

// Inicio de sesión
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert('Inicio de sesión exitoso');
    } catch (error) {
        console.error('Error en el inicio de sesión:', error.message);
        alert('Error en el inicio de sesión: ' + error.message);
    }
});

// Verificar estado de autenticación
onAuthStateChanged(auth, (user) => {
    const appContent = document.getElementById('app-content');
    if (user) {
        appContent.style.display = 'block';
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('register-form').style.display = 'none';
        cargarContenido();
    } else {
        appContent.style.display = 'none';
        document.getElementById('login-form').style.display = 'block';
        document.getElementById('register-form').style.display = 'block';
    }
});

// Cargar contenido de la aplicación después de autenticación
function cargarContenido() {
    // Lógica para agregar estudiante
    const addStudentForm = document.getElementById('add-student-form');
    addStudentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const email = document.getElementById('email').value;
        const message = await addStudent(firstName, lastName, email);
        document.getElementById('student-message').innerText = message;
        addStudentForm.reset();
    });

    // Lógica para agregar profesor
    const addTeacherForm = document.getElementById('add-teacher-form');
    addTeacherForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const firstName = document.getElementById('teacher-first-name').value;
        const lastName = document.getElementById('teacher-last-name').value;
        const email = document.getElementById('teacher-email').value;
        const message = await addTeacher(firstName, lastName, email);
        document.getElementById('teacher-message').innerText = message;
        addTeacherForm.reset();
    });

    // Lógica para agregar curso
    const addCourseForm = document.getElementById('add-course-form');
    addCourseForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const courseName = document.getElementById('course-name').value;
        const courseCode = document.getElementById('course-code').value;
        const courseProfessor = document.getElementById('course-professor').value;
        const message = await addCourse(courseName, courseCode, courseProfessor);
        document.getElementById('course-message').innerText = message;
        addCourseForm.reset();
    });

    // Funcionalidad de buscar, actualizar y eliminar (similar a agregar)

    // Listener para buscar estudiante
    document.getElementById('search-student-btn').addEventListener('click', async () => {
        const studentId = document.getElementById('search-student-id').value;
        const result = await searchStudentById(studentId);
        document.getElementById('search-student-result').innerText = result;
    });

    // Listener para actualizar estudiante
    document.getElementById('update-student-btn').addEventListener('click', async () => {
        const studentId = document.getElementById('update-student-id').value;
        const firstName = document.getElementById('update-student-first-name').value;
        const lastName = document.getElementById('update-student-last-name').value;
        const email = document.getElementById('update-student-email').value;
        const message = await updateStudent(studentId, firstName, lastName, email);
        alert(message);
    });

    // Listener para eliminar estudiante
    document.getElementById('delete-student-btn').addEventListener('click', async () => {
        const studentId = document.getElementById('delete-student-id').value;
        const message = await deleteStudent(studentId);
        alert(message);
    });

    // Listeners para profesores y cursos (similar a estudiantes)

    // Lógica para asignar estudiantes a cursos
    const assignStudentCourseForm = document.getElementById('assign-student-course-form');
    assignStudentCourseForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const courseId = document.getElementById('select-course').value;
        const studentId = document.getElementById('select-student').value;
        const message = await assignStudentToCourse(courseId, studentId);
        document.getElementById('assign-student-course-message').innerText = message;
        assignStudentCourseForm.reset();
    });

    // Listener para ver estudiantes asignados a un curso
    document.getElementById('view-students-btn').addEventListener('click', async () => {
        const courseId = document.getElementById('select-course-view').value;
        await viewAssignedStudents(courseId);
    });

    // Llamadas iniciales para listar datos en tiempo real
    listStudentsRealtime();
    listTeachersRealtime();
    listCoursesRealtime();
    populateProfessorDropdownRealtime();
}

// Aquí irían las funciones `addStudent`, `addTeacher`, `addCourse`, `searchStudentById`, `updateStudent`, `deleteStudent`, `assignStudentToCourse`, `viewAssignedStudents`, `listStudentsRealtime`, `listTeachersRealtime`, `listCoursesRealtime`, `populateProfessorDropdownRealtime` que interactúan con Firestore para manejar la lógica de cada sección.
