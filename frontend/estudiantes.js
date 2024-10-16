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

// Llamar a las funciones de listar en tiempo real
listStudentsRealtime();