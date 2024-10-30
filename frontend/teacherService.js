// teacherService.js

// Agregar un profesor
async function addTeacher(firstName, lastName, email) {
    try {
        await db.collection('profesores').add({
            firstName,
            lastName,
            email
        });
        return 'Profesor agregado exitosamente.';
    } catch (error) {
        return 'Error al agregar profesor: ' + error.message;
    }
}

// Listar profesores en tiempo real
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

// Buscar un profesor por ID
async function searchTeacherById(teacherId) {
    try {
        const doc = await db.collection('profesores').doc(teacherId).get();
        if (doc.exists) {
            const teacher = doc.data();
            return `Nombres: ${teacher.firstName}, Apellidos: ${teacher.lastName}, Email: ${teacher.email}`;
        } else {
            return 'Profesor no encontrado';
        }
    } catch (error) {
        return 'Error al buscar profesor: ' + error.message;
    }
}

// Actualizar un profesor
async function updateTeacher(teacherId, firstName, lastName, email) {
    try {
        await db.collection('profesores').doc(teacherId).update({
            firstName,
            lastName,
            email
        });
        return 'Profesor actualizado exitosamente.';
    } catch (error) {
        return 'Error al actualizar profesor: ' + error.message;
    }
}

// Eliminar un profesor
async function deleteTeacher(teacherId) {
    try {
        await db.collection('profesores').doc(teacherId).delete();
        return 'Profesor eliminado exitosamente.';
    } catch (error) {
        return 'Error al eliminar profesor: ' + error.message;
    }
}

// Llamar a la función para listar profesores en tiempo real
listTeachersRealtime();
