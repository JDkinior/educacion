// Inicialización de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA7yepF-8cAVkQJfCi3ClmfpDldU0GzbbM",
    authDomain: "educacion-1225b.firebaseapp.com",
    databaseURL: "https://educacion-1225b-default-rtdb.firebaseio.com",
    projectId: "educacion-1225b",
    storageBucket: "educacion-1225b.appspot.com",
    messagingSenderId: "965775350789",
    appId: "1:965775350789:web:af28339485696e84c6506c",
    measurementId: "G-NSXK8QQ63H"
  };
  
  // Inicializar Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Inicializar Firestore
  const db = firebase.firestore();
  
  // Manejar el formulario de agregar estudiante
  const addStudentForm = document.getElementById('add-student-form');
  addStudentForm.addEventListener('submit', async (e) => {
      e.preventDefault(); // Evitar que el formulario recargue la página
  
      // Obtener los valores de los campos
      const studentId = document.getElementById('student-id').value;
      const firstName = document.getElementById('first-name').value;
      const lastName = document.getElementById('last-name').value;
      const email = document.getElementById('email').value;
  
      try {
          // Agregar un nuevo documento a la colección "estudiantes"
          await db.collection('estudiantes').doc(studentId).set({
              firstName: firstName,
              lastName: lastName,
              email: email
          });
  
          document.getElementById('message').innerText = 'Estudiante agregado exitosamente.';
          addStudentForm.reset(); // Limpiar el formulario
      } catch (error) {
          document.getElementById('message').innerText = 'Error al agregar estudiante: ' + error.message;
      }
  });
  