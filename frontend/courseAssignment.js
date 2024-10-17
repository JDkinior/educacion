export function assignStudentToCourse() {
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
}

export function viewStudentsInCourse() {
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
}
