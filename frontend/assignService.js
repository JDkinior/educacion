// assignService.js

// Asignar estudiante a un curso
async function assignStudentToCourse(courseId, studentId) {
    if (!courseId || !studentId) {
        return 'Por favor selecciona un curso y un estudiante.';
    }
    try {
        const courseRef = db.collection('cursos').doc(courseId);
        await courseRef.update({
            students: firebase.firestore.FieldValue.arrayUnion(studentId) // Añadir estudiante al array de estudiantes del curso
        });
        return 'Estudiante asignado exitosamente.';
    } catch (error) {
        return 'Error al asignar estudiante: ' + error.message;
    }
}

// Ver estudiantes asignados a un curso
async function viewAssignedStudents(courseId) {
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
                            await courseRef.update({
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
}

// Poblar el menú desplegable de cursos en tiempo real
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

// Poblar el menú desplegable de estudiantes en tiempo real
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
