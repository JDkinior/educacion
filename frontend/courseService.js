// courseService.js

// Agregar un curso
async function addCourse(courseName, courseCode, courseProfessor) {
    if (!courseProfessor) {
        return 'Por favor selecciona un profesor.';
    }
    try {
        await db.collection('cursos').add({
            courseName,
            courseCode,
            courseProfessor
        });
        return 'Curso agregado exitosamente.';
    } catch (error) {
        return 'Error al agregar curso: ' + error.message;
    }
}

// Listar cursos en tiempo real
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

// Buscar un curso por ID
async function searchCourseById(courseId) {
    try {
        const doc = await db.collection('cursos').doc(courseId).get();
        if (doc.exists) {
            const course = doc.data();
            return `Nombre: ${course.courseName}, Código: ${course.courseCode}, Profesor: ${course.courseProfessor}`;
        } else {
            return 'Curso no encontrado';
        }
    } catch (error) {
        return 'Error al buscar curso: ' + error.message;
    }
}

// Actualizar un curso
async function updateCourse(courseId, courseName, courseCode, courseProfessor) {
    try {
        await db.collection('cursos').doc(courseId).update({
            courseName,
            courseCode,
            courseProfessor
        });
        return 'Curso actualizado exitosamente.';
    } catch (error) {
        return 'Error al actualizar curso: ' + error.message;
    }
}

// Eliminar un curso
async function deleteCourse(courseId) {
    try {
        await db.collection('cursos').doc(courseId).delete();
        return 'Curso eliminado exitosamente.';
    } catch (error) {
        return 'Error al eliminar curso: ' + error.message;
    }
}

// Llenar el menú desplegable de profesores en tiempo real
function populateProfessorDropdownRealtime() {
    const courseProfessorSelect = document.getElementById('course-professor');
    db.collection('profesores').onSnapshot((snapshot) => {
        courseProfessorSelect.innerHTML = '<option value="">Seleccionar Profesor</option>';
        snapshot.forEach((doc) => {
            const professor = doc.data();
            const option = document.createElement('option');
            option.value = doc.id;
            option.textContent = `${professor.firstName} ${professor.lastName}`;
            courseProfessorSelect.appendChild(option);
        });
    });
}

// Llamar a la función para poblar el menú de profesores en tiempo real
populateProfessorDropdownRealtime();
