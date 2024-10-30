document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        try {
            const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
            // Redirigir a la página de funciones si el inicio de sesión es exitoso
            window.location.href = 'index.html';
        } catch (error) {
            document.getElementById('login-message').innerText = 'Error al iniciar sesión: ' + error.message;
        }
    });
});
