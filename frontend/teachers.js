export function handleTeacherForm() {
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
}

export function listTeachersRealtime() {
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

export function searchTeacher() {
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
}

export function updateTeacher() {
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
}

export function deleteTeacher() {
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
}
