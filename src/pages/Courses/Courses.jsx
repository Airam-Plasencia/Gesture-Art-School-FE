import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";

function Courses() {
  const [courses, setCourses] = useState([]); // Lista de cursos disponibles
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const { user, setUser } = useContext(AuthContext);  // Acceso al usuario desde el contexto
  const navigate = useNavigate();  // Para redireccionar

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/courses`)
      .then((response) => {
        setCourses(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error al cargar los datos");
        setLoading(false);
      });
  }, []);

  // Función para añadir un curso al perfil del usuario
  const addCourseToProfile = (courseId) => {
    if (!user) {
      console.error("No user found in context");
      setError("No user found in context");
      return;
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No token found");
      setError("No token found");
      return;
    }

    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/users/${user._id}/courses`,
        { courseId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Curso agregado correctamente:", response.data);
        const updatedUser = response.data.user;
        setUser(updatedUser);  // Actualiza el usuario en el contexto con los cursos nuevos
      })
      .catch((err) => {
        console.error("Error al añadir curso:", err.response ? err.response.data : err.message);
        setError("Hubo un problema al añadir el curso. Intenta nuevamente.");
      });
  };

  // Función para mostrar confirmación antes de eliminar
  const confirmDelete = (courseId, courseName) => {
    setCourseToDelete({ id: courseId, name: courseName });
    setShowConfirmation(true);
  };

  // Función para eliminar un curso
  const deleteCourse = async () => {
    if (!courseToDelete) return;

    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/admin/courses/${courseToDelete.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Curso eliminado:", response.data);

      // Actualiza la lista de cursos eliminando el curso de la lista
      setCourses((prevCourses) => prevCourses.filter(course => course._id !== courseToDelete.id));

      // Cierra el modal de confirmación
      setShowConfirmation(false);
      setCourseToDelete(null);
    } catch (error) {
      console.error("Error al eliminar el curso:", error);
      alert("No se pudo eliminar el curso.");
      setShowConfirmation(false);
    }
  };

  // Función para cancelar eliminación
  const cancelDelete = () => {
    setShowConfirmation(false);
    setCourseToDelete(null);
  };

  // Si está cargando los cursos
  if (loading) {
    return <div className="text-center text-lg text-blue-500">Cargando cursos...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center text-blue-500 mb-8">Available Courses</h1>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      {/* Modal de confirmación */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Confirm Deletion</h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete the course "{courseToDelete.name}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelDelete}
                className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
              >
                Cancel
              </button>
              <button
                onClick={deleteCourse}
                className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all flex"
          >
            <img
              src={course.image}
              alt={course.courseName}
              className="w-56 h-64 object-cover rounded-md mr-4"
            />
            <div>
              <h2 className="text-2xl font-semibold text-orange-500">{course.courseName}</h2>
              <p className="text-gray-600 font-semibold mt-2">{course.courseDescription}</p>
              <div className="mt-4">
                <p className="text-gray-500">Level: {course.courseLevel}</p>
                <p className="text-gray-500">Duration: {course.courseDuration}</p>
                <p className="text-gray-500">Materials: {course.requiredMaterials}</p>
              </div>
              <br />
              {/* Botón para añadir el curso */}
              <button
                onClick={() => addCourseToProfile(course._id)}
                className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                  Add Course
                </span>
              </button>

              {/* Si el usuario es admin, mostramos los botones para modificar y eliminar */}
              {user && user.role === "admin" && (
                <div>
                  {/* Botón para editar el curso */}
                  <button
                    onClick={() => navigate(`/edit-course/${course._id}`)}
                    className="text-yellow-900 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
                  >
                    Edit Course
                  </button>

                  {/* Botón para eliminar el curso */}
                  <button
                    onClick={() => confirmDelete(course._id, course.courseName)}
                    className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                  >
                    Delete Course
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;












