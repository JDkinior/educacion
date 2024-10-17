export function handleCourseForm() {
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
}

export function listCoursesRealtime() {
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

export function searchCourse() {
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
}

export function updateCourse() {
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
}

export function deleteCourse() {
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
}
