// authService.js

import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

// Función para iniciar sesión
async function loginUser(email, password) {
    const auth = getAuth();
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
    const auth = getAuth();
    try {
        await signOut(auth);
        return "Sesión cerrada";
    } catch (error) {
        console.error("Error al cerrar sesión:", error.message);
        return "Error al cerrar sesión: " + error.message;
    }
}

// Función para detectar el estado de autenticación
function monitorAuthState(callback) {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            callback(true);
        } else {
            callback(false);
        }
    });
}
