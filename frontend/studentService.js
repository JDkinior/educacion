// studentService.js

// Agregar un estudiante
async function addStudent(firstName, lastName, email) {
    try {
        await db.collection('estudiantes').add({
            firstName,
            lastName,
            email
        });
        return 'Estudiante agregado exitosamente.';
    } catch (error) {
        return 'Error al agregar estudiante: ' + error.message;
    }
}

// Listar estudiantes en tiempo real
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

// Buscar un estudiante por ID
async function searchStudentById(studentId) {
    try {
        const doc = await db.collection('estudiantes').doc(studentId).get();
        if (doc.exists) {
            const student = doc.data();
            return `Nombres: ${student.firstName}, Apellidos: ${student.lastName}, Email: ${student.email}`;
        } else {
            return 'Estudiante no encontrado';
        }
    } catch (error) {
        return 'Error al buscar estudiante: ' + error.message;
    }
}

// Actualizar un estudiante
async function updateStudent(studentId, firstName, lastName, email) {
    try {
        await db.collection('estudiantes').doc(studentId).update({
            firstName,
            lastName,
            email
        });
        return 'Estudiante actualizado exitosamente.';
    } catch (error) {
        return 'Error al actualizar estudiante: ' + error.message;
    }
}

// Eliminar un estudiante
async function deleteStudent(studentId) {
    try {
        await db.collection('estudiantes').doc(studentId).delete();
        return 'Estudiante eliminado exitosamente.';
    } catch (error) {
        return 'Error al eliminar estudiante: ' + error.message;
    }
}

// Llamar a la función para listar estudiantes en tiempo real
listStudentsRealtime();
