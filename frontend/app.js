document.addEventListener('DOMContentLoaded', () => {

firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
        window.location.href = 'login.html'; // Redirige si no hay usuario autenticado
    }
});
    
    
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



    // Llenar el menú desplegable de profesores en tiempo real
    function populateProfessorDropdownRealtime() {
        const courseProfessorSelect = document.getElementById('course-professor');
        
        // Escuchar los cambios en la colección 'profesores'
        db.collection('profesores').onSnapshot((snapshot) => {
            // Limpiar el menú para evitar duplicados
            courseProfessorSelect.innerHTML = '<option value="">Seleccionar Profesor</option>';
            
            snapshot.forEach((doc) => {
                const professor = doc.data();
                const option = document.createElement('option');
                option.value = doc.id; // Guardar el ID del profesor como valor
                option.textContent = `${professor.firstName} ${professor.lastName}`;
                courseProfessorSelect.appendChild(option);
            });
        }, (error) => {
            console.error('Error al cargar los profesores en tiempo real: ', error);
        });
    }

    // Llamar a la función para poblar el menú desplegable en tiempo real
    populateProfessorDropdownRealtime();


    // Manejar el formulario de agregar curso
    const addCourseForm = document.getElementById('add-course-form');
    addCourseForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const courseName = document.getElementById('course-name').value;
        const courseCode = document.getElementById('course-code').value;
        const courseProfessor = document.getElementById('course-professor').value;

        if (!courseProfessor) {
            document.getElementById('course-message').innerText = 'Por favor selecciona un profesor.';
            return;
        }

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

// Poblar el menú de cursos en tiempo real
function populateCoursesDropdownRealtime() {
    const courseSelect = document.getElementById('select-course');
    const courseViewSelect = document.getElementById('select-course-view');

    db.collection('cursos').onSnapshot((snapshot) => {
        courseSelect.innerHTML = '<option value="">Seleccionar Curso</option>';
        courseViewSelect.innerHTML = '<option value="">Seleccionar Curso</option>';
        
        snapshot.forEach((doc) => {
            const course = doc.data();
            const option = document.createElement('option');
            option.value = doc.id; // Guardar el ID del curso como valor
            option.textContent = `${course.courseName} (${course.courseCode})`;
            courseSelect.appendChild(option);
            courseViewSelect.appendChild(option.cloneNode(true));
        });
    });
}

// Poblar el menú de estudiantes en tiempo real
function populateStudentsDropdownRealtime() {
    const studentSelect = document.getElementById('select-student');

    db.collection('estudiantes').onSnapshot((snapshot) => {
        studentSelect.innerHTML = '<option value="">Seleccionar Estudiante</option>';
        
        snapshot.forEach((doc) => {
            const student = doc.data();
            const option = document.createElement('option');
            option.value = doc.id; // Guardar el ID del estudiante como valor
            option.textContent = `${student.firstName} ${student.lastName}`;
            studentSelect.appendChild(option);
        });
    });
}

// Llamar a las funciones para poblar los menús desplegables en tiempo real
populateCoursesDropdownRealtime();
populateStudentsDropdownRealtime();

// Manejar la asignación de estudiantes a cursos
const assignStudentCourseForm = document.getElementById('assign-student-course-form');
assignStudentCourseForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const courseId = document.getElementById('select-course').value;
    const studentId = document.getElementById('select-student').value;

    if (!courseId || !studentId) {
        document.getElementById('assign-student-course-message').innerText = 'Por favor selecciona un curso y un estudiante.';
        return;
    }

    try {
        const courseRef = db.collection('cursos').doc(courseId);
        await courseRef.update({
            students: firebase.firestore.FieldValue.arrayUnion(studentId) // Añadir estudiante al array de estudiantes del curso
        });
        document.getElementById('assign-student-course-message').innerText = 'Estudiante asignado exitosamente.';
        assignStudentCourseForm.reset();
    } catch (error) {
        document.getElementById('assign-student-course-message').innerText = 'Error al asignar estudiante: ' + error.message;
    }
});


// Mostrar estudiantes asignados a un curso
const viewStudentsBtn = document.getElementById('view-students-btn');
viewStudentsBtn.addEventListener('click', async () => {
    const courseId = document.getElementById('select-course-view').value;

    if (!courseId) {
        document.getElementById('student-course-list').innerText = 'Por favor selecciona un curso.';
        return;
    }

    try {
        const courseDoc = await db.collection('cursos').doc(courseId).get();
        if (courseDoc.exists) {
            const courseData = courseDoc.data();
            const studentList = courseData.students || [];
            
            const studentCourseList = document.getElementById('student-course-list');
            studentCourseList.innerHTML = '';

            // Mostrar cada estudiante asignado
            for (const studentId of studentList) {
                const studentDoc = await db.collection('estudiantes').doc(studentId).get();
                if (studentDoc.exists) {
                    const student = studentDoc.data();
                    const li = document.createElement('li');
                    li.textContent = `${student.firstName} ${student.lastName}`;

                    // Botón para eliminar estudiante del curso
                    const removeButton = document.createElement('button');
                    removeButton.textContent = 'Eliminar';
                    removeButton.addEventListener('click', async () => {
                        try {
                            await db.collection('cursos').doc(courseId).update({
                                students: firebase.firestore.FieldValue.arrayRemove(studentId) // Eliminar estudiante del array
                            });
                            li.remove(); // Eliminar el elemento visualmente
                            alert('Estudiante eliminado del curso.');
                        } catch (error) {
                            alert('Error al eliminar estudiante del curso: ' + error.message);
                        }
                    });
                    li.appendChild(removeButton);
                    studentCourseList.appendChild(li);
                }
            }
        } else {
            document.getElementById('student-course-list').innerText = 'Curso no encontrado.';
        }
    } catch (error) {
        document.getElementById('student-course-list').innerText = 'Error al cargar estudiantes: ' + error.message;
    }
});



// Llamar a las funciones de listar en tiempo real
listStudentsRealtime();
listTeachersRealtime();
listCoursesRealtime();

});
