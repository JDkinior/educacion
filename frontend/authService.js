// authService.js

import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

const auth = getAuth(); // Inicializa Firebase Auth

// Función para iniciar sesión
async function loginUser(email, password) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        return "Inicio de sesión exitoso";
    } catch (error) {
        console.error("Error en el inicio de sesión:", error.message);
        return "Error en el inicio de sesión: " + error.message;
    }
}

// Función para cerrar sesión
async function logoutUser() {
    try {
        await signOut(auth);
        return "Sesión cerrada";
    } catch (error) {
        console.error("Error al cerrar sesión:", error.message);
        return "Error al cerrar sesión: " + error.message;
    }
}

// Función para monitorear el estado de autenticación y ejecutar un callback
function monitorAuthState(callback) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            callback(true);  // Usuario autenticado
        } else {
            callback(false); // Usuario no autenticado
        }
    });
}

export { loginUser, logoutUser, monitorAuthState };
