# Gestión de Estudiantes y Profesores

Este proyecto es una plataforma web sencilla que permite gestionar estudiantes y profesores mediante una interfaz intuitiva. Utiliza Firebase como base de datos para agregar, buscar, actualizar, eliminar y listar estudiantes y profesores en tiempo real.

## Características

- **Agregar estudiantes y profesores**: Puedes añadir estudiantes y profesores con nombre, apellidos y correo electrónico.
- **Listar en tiempo real**: Muestra la lista de estudiantes y profesores actualizada en tiempo real gracias a la integración con Firebase Firestore.
- **Buscar estudiantes y profesores**: Encuentra rápidamente un estudiante o profesor por su ID.
- **Actualizar información**: Modifica la información de un estudiante o profesor existente.
- **Eliminar registros**: Borra estudiantes y profesores de la base de datos.

## Estructura del Proyecto

El proyecto está dividido en dos partes principales: `frontend` y `backend`.

### Pre-requisitos

Antes de empezar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org) y npm (Node Package Manager)
- Un proyecto de Firebase configurado con Firestore.

## Navega a la carpeta del proyecto:

- cd gestion-estudiantes-profesores

## Configura Firebase:

Crea un archivo firebaseConfig.js en la carpeta backend y coloca allí la configuración de Firebase que obtienes desde la consola de Firebase.
Ejemplo del archivo [firebaseConfig.js]:

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

## Inicia el servidor de desarrollo:
En este caso se cargó en netlify

## Uso
- Agregar **Estudiante/Profesor**
- Completa el formulario en la sección **"Agregar Estudiante"** o **"Agregar Profesor".**
- Haz clic en **"Agregar"** y el estudiante/profesor será añadido a la base de datos.
- Listar **Estudiantes/Profesores**
- La lista de estudiantes y profesores se mostrará automáticamente en tiempo real.
- Actualizar **Estudiante/Profesor**
- Busca el **estudiante/profesor**, selecciona el registro a actualizar, modifica los campos y haz clic en **"Actualizar".**
- Eliminar **Estudiante/Profesor**
- Ingresa el ID del estudiante/profesor y haz clic en **"Eliminar".**