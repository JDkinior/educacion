// app.js

import { loginUser, logoutUser, monitorAuthState } from "./authService.js"; 

document.addEventListener('DOMContentLoaded', () => {

        // Variables de la interfaz
        const loginForm = document.getElementById('login-form');
        const loginSection = document.getElementById('login-section');
        const appSection = document.getElementById('app-section');
        const loginMessage = document.getElementById('login-message');
    
        // Manejar inicio de sesión
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const message = await loginUser(email, password);
            loginMessage.innerText = message;
        });
    
        // Monitorear el estado de autenticación
        monitorAuthState((isAuthenticated) => {
            if (isAuthenticated) {
                loginSection.style.display = 'none';
                appSection.style.display = 'block';
                initApp(); // Inicializar la aplicación si el usuario está autenticado
            } else {
                loginSection.style.display = 'block';
                appSection.style.display = 'none';
            }
        });
    
        // Función para inicializar la aplicación
        function initApp() {
            // Aquí va el código existente de inicialización de la app
        }
    
        // Función de cerrar sesión
        document.getElementById('logout-btn').addEventListener('click', async () => {
            const message = await logoutUser();
            alert(message);
        });
        
    // Listeners para el formulario de agregar estudiante
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

    // Listeners para el formulario de agregar profesor
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

    // Listeners para el formulario de agregar curso
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

    // Listener para buscar estudiante
    const searchStudentBtn = document.getElementById('search-student-btn');
    searchStudentBtn.addEventListener('click', async () => {
        const studentId = document.getElementById('search-student-id').value;
        const result = await searchStudentById(studentId);
        document.getElementById('search-student-result').innerText = result;
    });

    // Listener para buscar profesor
    const searchTeacherBtn = document.getElementById('search-teacher-btn');
    searchTeacherBtn.addEventListener('click', async () => {
        const teacherId = document.getElementById('search-teacher-id').value;
        const result = await searchTeacherById(teacherId);
        document.getElementById('search-teacher-result').innerText = result;
    });

    // Listener para buscar curso
    const searchCourseBtn = document.getElementById('search-course-btn');
    searchCourseBtn.addEventListener('click', async () => {
        const courseId = document.getElementById('search-course-id').value;
        const result = await searchCourseById(courseId);
        document.getElementById('search-course-result').innerText = result;
    });

    // Listener para actualizar estudiante
    const updateStudentBtn = document.getElementById('update-student-btn');
    updateStudentBtn.addEventListener('click', async () => {
        const studentId = document.getElementById('update-student-id').value;
        const firstName = document.getElementById('update-student-first-name').value;
        const lastName = document.getElementById('update-student-last-name').value;
        const email = document.getElementById('update-student-email').value;
        const message = await updateStudent(studentId, firstName, lastName, email);
        alert(message);
    });

    // Listener para actualizar profesor
    const updateTeacherBtn = document.getElementById('update-teacher-btn');
    updateTeacherBtn.addEventListener('click', async () => {
        const teacherId = document.getElementById('update-teacher-id').value;
        const firstName = document.getElementById('update-teacher-first-name').value;
        const lastName = document.getElementById('update-teacher-last-name').value;
        const email = document.getElementById('update-teacher-email').value;
        const message = await updateTeacher(teacherId, firstName, lastName, email);
        alert(message);
    });

    // Listener para actualizar curso
    const updateCourseBtn = document.getElementById('update-course-btn');
    updateCourseBtn.addEventListener('click', async () => {
        const courseId = document.getElementById('update-course-id').value;
        const courseName = document.getElementById('update-course-name').value;
        const courseCode = document.getElementById('update-course-code').value;
        const courseProfessor = document.getElementById('update-course-professor').value;
        const message = await updateCourse(courseId, courseName, courseCode, courseProfessor);
        alert(message);
    });

    // Listener para eliminar estudiante
    const deleteStudentBtn = document.getElementById('delete-student-btn');
    deleteStudentBtn.addEventListener('click', async () => {
        const studentId = document.getElementById('delete-student-id').value;
        const message = await deleteStudent(studentId);
        alert(message);
    });

    // Listener para eliminar profesor
    const deleteTeacherBtn = document.getElementById('delete-teacher-btn');
    deleteTeacherBtn.addEventListener('click', async () => {
        const teacherId = document.getElementById('delete-teacher-id').value;
        const message = await deleteTeacher(teacherId);
        alert(message);
    });

    // Listener para eliminar curso
    const deleteCourseBtn = document.getElementById('delete-course-btn');
    deleteCourseBtn.addEventListener('click', async () => {
        const courseId = document.getElementById('delete-course-id').value;
        const message = await deleteCourse(courseId);
        alert(message);
    });

    // Listener para asignar estudiante a curso
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
    const viewStudentsBtn = document.getElementById('view-students-btn');
    viewStudentsBtn.addEventListener('click', async () => {
        const courseId = document.getElementById('select-course-view').value;
        await viewAssignedStudents(courseId);
    });

    // Llamadas iniciales para listar datos en tiempo real
    listStudentsRealtime();
    listTeachersRealtime();
    listCoursesRealtime();
    populateProfessorDropdownRealtime();
});
