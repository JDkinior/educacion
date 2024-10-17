import { handleStudentForm, listStudentsRealtime, searchStudent, updateStudent, deleteStudent } from './students.js';
import { handleTeacherForm, listTeachersRealtime, searchTeacher, updateTeacher, deleteTeacher } from './teachers.js';
import { handleCourseForm, listCoursesRealtime, searchCourse, updateCourse, deleteCourse } from './courses.js';
import { assignStudentToCourse, viewStudentsInCourse } from './courseAssignment.js';

document.addEventListener('DOMContentLoaded', () => {
    // Importar funciones desde otros archivos


    // Manejar formularios y eventos de estudiantes
    handleStudentForm();
    listStudentsRealtime();
    searchStudent();
    updateStudent();
    deleteStudent();

    // Manejar formularios y eventos de profesores
    handleTeacherForm();
    listTeachersRealtime();
    searchTeacher();
    updateTeacher();
    deleteTeacher();

    // Manejar formularios y eventos de cursos
    handleCourseForm();
    listCoursesRealtime();
    searchCourse();
    updateCourse();
    deleteCourse();

    // Asignar estudiantes a cursos y ver asignaciones
    assignStudentToCourse();
    viewStudentsInCourse();
});
