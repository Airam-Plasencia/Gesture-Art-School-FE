import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useContext(AuthContext);  // Acceso al usuario desde el contexto
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
        // Actualizamos los cursos del usuario en el contexto
        setCourses(updatedUser.courses);
      })
      .catch((err) => {
        console.error("Error al añadir curso:", err.response ? err.response.data : err.message);
        setError("Hubo un problema al añadir el curso. Intenta nuevamente.");
      });
  };

  // Función para eliminar un curso
  const deleteCourse = async (courseId) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.delete(`http://localhost:5000/admin/courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Curso eliminado:", response.data);
    } catch (error) {
      console.error("Error al eliminar el curso:", error);
      alert("No se pudo eliminar el curso.");
    }
  };

  // Si está cargando los cursos
  if (loading) {
    return <div className="text-center text-lg text-blue-500">Cargando cursos...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center text-blue-500 mb-8">Available Courses</h1>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

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

                 
                  <button
                    onClick={() => deleteCourse(course._id)}
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












