import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extraer userId y los cursos desde el contexto
  const { user, setUser } = useContext(AuthContext);

  const userId = user ? user._id : null;

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

  const addCourseToProfile = (courseId) => {
    if (!userId) {
      console.error("No userId found in context");
      setError("No userId found in context");
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
        `${process.env.REACT_APP_SERVER_URL}/users/${userId}/courses`, // Usar el userId desde el contexto
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

        // Actualiza el estado de usuario con los cursos actualizados
        setUser(updatedUser);  // Actualiza el contexto del usuario con los cursos nuevos
        setCourses(updatedUser.courses);  // Actualiza los cursos en el componente Courses
      })
      .catch((err) => {
        console.error("Error al añadir curso:", err.response ? err.response.data : err.message);
        setError("Hubo un problema al añadir el curso. Intenta nuevamente.");
      });
  };

  if (loading) {
    return <div className="text-center text-lg text-blue-500">Cargando cursos...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center text-blue-500 mb-8">Available Courses</h1>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course._id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all flex">
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
              <button
                onClick={() => addCourseToProfile(course._id)}
                className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                  Add Course
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;





