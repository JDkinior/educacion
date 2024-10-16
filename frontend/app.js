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
            li.addEventListener('click', () => {
                document.getElementById('update-student-id').value = doc.id;
                document.getElementById('update-student-first-name').value = student.firstName;
                document.getElementById('update-student-last-name').value = student.lastName;
                document.getElementById('update-student-email').value = student.email;
            });
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
            li.addEventListener('click', () => {
                document.getElementById('update-teacher-id').value = doc.id;
                document.getElementById('update-teacher-first-name').value = teacher.firstName;
                document.getElementById('update-teacher-last-name').value = teacher.lastName;
                document.getElementById('update-teacher-email').value = teacher.email;
            });
            teacherList.appendChild(li);
        });
    });
}

// Búsqueda de estudiante por ID
const searchStudentBtn = document.getElementById('search-student-btn');
searchStudentBtn.addEventListener('click', async () => {
    const studentId = document.getElementById('search-student-id').value;

    try {
        const doc = await db.collection('estudiantes').doc(studentId).get();
        if (doc.exists) {
            const student = doc.data();
            document.getElementById('search-student-result').innerText = `Nombres: ${student.firstName}, Apellidos: ${student.lastName}, Email: ${student.email}`;
        } else {
            document.getElementById('search-student-result').innerText = 'Estudiante no encontrado';
        }
    } catch (error) {
        document.getElementById('search-student-result').innerText = 'Error al buscar estudiante: ' + error.message;
    }
});

// Búsqueda de profesor por ID
const searchTeacherBtn = document.getElementById('search-teacher-btn');
searchTeacherBtn.addEventListener('click', async () => {
    const teacherId = document.getElementById('search-teacher-id').value;

    try {
        const doc = await db.collection('profesores').doc(teacherId).get();
        if (doc.exists) {
            const teacher = doc.data();
            document.getElementById('search-teacher-result').innerText = `Nombres: ${teacher.firstName}, Apellidos: ${teacher.lastName}, Email: ${teacher.email}`;
        } else {
            document.getElementById('search-teacher-result').innerText = 'Profesor no encontrado';
        }
    } catch (error) {
        document.getElementById('search-teacher-result').innerText = 'Error al buscar profesor: ' + error.message;
    }
});

// Actualizar estudiante
const updateStudentBtn = document.getElementById('update-student-btn');
updateStudentBtn.addEventListener('click', async () => {
    const studentId = document.getElementById('update-student-id').value;
    const firstName = document.getElementById('update-student-first-name').value;
    const lastName = document.getElementById('update-student-last-name').value;
    const email = document.getElementById('update-student-email').value;

    try {
        await db.collection('estudiantes').doc(studentId).update({
            firstName,
            lastName,
            email
        });
        alert('Estudiante actualizado exitosamente.');
    } catch (error) {
        alert('Error al actualizar estudiante: ' + error.message);
    }
});

// Actualizar profesor
const updateTeacherBtn = document.getElementById('update-teacher-btn');
updateTeacherBtn.addEventListener('click', async () => {
    const teacherId = document.getElementById('update-teacher-id').value;
    const firstName = document.getElementById('update-teacher-first-name').value;
    const lastName = document.getElementById('update-teacher-last-name').value;
    const email = document.getElementById('update-teacher-email').value;

    try {
        await db.collection('profesores').doc(teacherId).update({
            firstName,
            lastName,
            email
        });
        alert('Profesor actualizado exitosamente.');
    } catch (error) {
        alert('Error al actualizar profesor: ' + error.message);
    }
});

// Eliminar estudiante
const deleteStudentBtn = document.getElementById('delete-student-btn');
deleteStudentBtn.addEventListener('click', async () => {
    const studentId = document.getElementById('delete-student-id').value;

    try {
        await db.collection('estudiantes').doc(studentId).delete();
        alert('Estudiante eliminado exitosamente.');
    } catch (error) {
        alert('Error al eliminar estudiante: ' + error.message);
    }
});

// Eliminar profesor
const deleteTeacherBtn = document.getElementById('delete-teacher-btn');
deleteTeacherBtn.addEventListener('click', async () => {
    const teacherId = document.getElementById('delete-teacher-id').value;

    try {
        await db.collection('profesores').doc(teacherId).delete();
        alert('Profesor eliminado exitosamente.');
    } catch (error) {
        alert('Error al eliminar profesor: ' + error.message);
    }
});



document.addEventListener('DOMContentLoaded', () => {
// Manejar el formulario de agregar curso
const addCourseForm = document.getElementById('add-course-form');
addCourseForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const courseName = document.getElementById('course-name').value;
    const courseCode = document.getElementById('course-code').value;
    const courseProfessor = document.getElementById('course-professor').value;

    try {
        await db.collection('cursos').add({
            courseName,
            courseCode,
            courseProfessor
        });
        document.getElementById('course-message').innerText = 'Curso agregado exitosamente.';
        addCourseForm.reset();
    } catch (error) {
        document.getElementById('course-message').innerText = 'Error al agregar curso: ' + error.message;
    }
});


function listCoursesRealtime() {
    db.collection('cursos').onSnapshot((snapshot) => {
        const courseList = document.getElementById('course-list');
        courseList.innerHTML = '';
        snapshot.forEach((doc) => {
            const course = doc.data();
            const li = document.createElement('li');
            li.textContent = `ID: ${doc.id}, Nombre: ${course.courseName}, Código: ${course.courseCode}, Profesor: ${course.courseProfessor}`;
            li.addEventListener('click', () => {
                document.getElementById('update-course-id').value = doc.id;
                document.getElementById('update-course-name').value = course.courseName;
                document.getElementById('update-course-code').value = course.courseCode;
                document.getElementById('update-course-professor').value = course.courseProfessor;
            });
            courseList.appendChild(li);
        });
    });
}


const searchCourseBtn = document.getElementById('search-course-btn');
searchCourseBtn.addEventListener('click', async () => {
    const courseId = document.getElementById('search-course-id').value;

    try {
        const doc = await db.collection('cursos').doc(courseId).get();
        if (doc.exists) {
            const course = doc.data();
            document.getElementById('search-course-result').innerText = `Nombre: ${course.courseName}, Código: ${course.courseCode}, Profesor: ${course.courseProfessor}`;
        } else {
            document.getElementById('search-course-result').innerText = 'Curso no encontrado';
        }
    } catch (error) {
        document.getElementById('search-course-result').innerText = 'Error al buscar curso: ' + error.message;
    }
});


const updateCourseBtn = document.getElementById('update-course-btn');
updateCourseBtn.addEventListener('click', async () => {
    const courseId = document.getElementById('update-course-id').value;
    const courseName = document.getElementById('update-course-name').value;
    const courseCode = document.getElementById('update-course-code').value;
    const courseProfessor = document.getElementById('update-course-professor').value;

    try {
        await db.collection('cursos').doc(courseId).update({
            courseName,
            courseCode,
            courseProfessor
        });
        alert('Curso actualizado exitosamente.');
    } catch (error) {
        alert('Error al actualizar curso: ' + error.message);
    }
});


const deleteCourseBtn = document.getElementById('delete-course-btn');
deleteCourseBtn.addEventListener('click', async () => {
    const courseId = document.getElementById('delete-course-id').value;

    try {
        await db.collection('cursos').doc(courseId).delete();
        alert('Curso eliminado exitosamente.');
    } catch (error) {
        alert('Error al eliminar curso: ' + error.message);
    }
});



// Llamar a las funciones de listar en tiempo real
listStudentsRealtime();
listTeachersRealtime();
listCoursesRealtime();

});
