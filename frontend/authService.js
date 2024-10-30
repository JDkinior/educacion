// authService.js

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

const auth = getAuth(); // Inicializa Firebase Auth

// Función para registrar un nuevo usuario
async function registerUser(email, password) {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        return "Registro exitoso";
    } catch (error) {
        console.error("Error en el registro:", error.message);
        return "Error en el registro: " + error.message;
    }
}

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

// Función para monitorear el estado de autenticación
function monitorAuthState(callback) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("Usuario autenticado:", user);
            callback(true);  // Usuario autenticado
        } else {
            console.log("Usuario no autenticado");
            callback(false); // Usuario no autenticado
        }
    });
}

export { registerUser, loginUser, logoutUser, monitorAuthState };
