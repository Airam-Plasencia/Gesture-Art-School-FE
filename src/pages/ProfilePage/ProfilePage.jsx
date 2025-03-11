import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/auth.context';

function ProfilePage() {
  const [addedCourses, setAddedCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);  // Obtén el usuario desde el contexto
  const userId = user ? user._id : null;

  useEffect(() => {
    if (!userId) {
      setError('No userId found in context');
      setLoading(false);
      return;  // Si no hay userId, muestra el error
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('No token found');
      setLoading(false);
      return;  // Si no hay token, muestra el error
    }

    console.log("Cargando cursos para usuario ID:", userId);

    // Obtener los cursos del usuario
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Datos recibidos:", response.data);
        setAddedCourses(response.data.courses || []);  // Asegurarnos de que courses sea un array
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al cargar los cursos:', err.response ? err.response.data : err.message);
        setError('Error al cargar los cursos del perfil.');  // Muestra el error si ocurre
        setLoading(false);
      });

    // Obtener la lista de cursos disponibles para añadir
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/courses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Cursos disponibles:", response.data);
        setAvailableCourses(response.data);  // Establecer cursos disponibles
      })
      .catch((err) => {
        console.error('Error al cargar los cursos disponibles:', err.response ? err.response.data : err.message);
        setError('Error al cargar los cursos disponibles.');  // Muestra el error si ocurre
      });

  }, [userId]);

  // Función para añadir un curso al perfil del usuario
  const addCourseToUser = (courseId) => {
    const token = localStorage.getItem('authToken');
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/users/${userId}/courses`, { courseId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Curso añadido:", response.data);
        setAddedCourses((prevCourses) => [...prevCourses, response.data.course]);  // Actualiza la lista de cursos añadidos
      })
      .catch((err) => {
        console.error('Error al añadir el curso:', err.response ? err.response.data : err.message);
        setError('Error al añadir el curso.');
      });
  };

  // Función para eliminar curso de la vista (no de la base de datos)
  const removeCourseFromView = (courseId) => {
    console.log("Removiendo curso con ID:", courseId);
    setAddedCourses((prevCourses) =>
      prevCourses.filter((course) => course._id !== courseId)
    );
  };

  // Para depuración
  console.log("Estado actual - addedCourses:", addedCourses);

  // Filtrar los cursos disponibles para mostrar solo los que no han sido añadidos
  const filteredAvailableCourses = availableCourses.filter(course =>
    !addedCourses.some(addedCourse => addedCourse._id === course._id)
  );

  return (
    <div className="container mx-auto p-6">
      {/* Tooltip and Profile Title */}
      <div className="relative mb-8">
        <div
          id="tooltip-bonnie"
          role="tooltip"
          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700"
        >
          {user ? user.name || 'User Profile' : 'User Profile'}
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <img
          data-tooltip-target="tooltip-bonnie"
          className="w-44 h-44 rounded-full inline-block ml-3"
          src="https://w0.peakpx.com/wallpaper/685/815/HD-wallpaper-artstation-women-portrait-display-digital-painting-eyelashes-black-background-fan-art-digital-art-artwork-lea-bichlmaier-profile.jpg"
          alt="Profile Avatar"
        />
      </div>

      {/* Mostrar error si ocurre */}
      {error && <div className="text-red-500 text-center mb-4 p-2 bg-red-100 rounded">{error}</div>}
      
      {/* Mostrar cargando */}
      {loading ? (
        <div className="text-center">Cargando cursos...</div>
      ) : (
        <>
          <h2 className="text-xl font-semibold text-orange-500 mb-6">Your Added Courses:</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {addedCourses.length === 0 ? (
              <p className="col-span-3 text-center p-4 bg-gray-100 rounded">No courses added yet. Check out our <a href="/courses" className="text-blue-500 hover:underline">available courses</a>!</p>
            ) : (
              addedCourses.map((course) => (
                <div key={course._id || Math.random()} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all">
                  {course.image && (
                    <img
                      src={course.image}
                      alt={course.courseName}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                  )}
                  <h2 className="text-2xl font-semibold text-orange-500 mb-2">{course.courseName}</h2>
                  <p className="text-gray-600 font-semibold mt-2">{course.courseDescription}</p>
                  <div className="mt-4">
                    <p className="text-gray-500">Level: {course.courseLevel}</p>
                    <p className="text-gray-500">Duration: {course.courseDuration}</p>
                    <p className="text-gray-500">Materials: {course.requiredMaterials}</p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => removeCourseFromView(course._id)}  
                      className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full"
                    >
                      Remove Course
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Mostrar cursos disponibles para agregar */}
          <h2 className="text-xl font-semibold text-orange-500 mt-8">Available Courses to Add:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {filteredAvailableCourses.length === 0 ? (
              <p>No available courses to add.</p>
            ) : (
              filteredAvailableCourses.map((course) => (
                <div key={course._id || Math.random()} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all">
                  {course.image && (
                    <img
                      src={course.image}
                      alt={course.courseName}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                  )}
                  <h2 className="text-2xl font-semibold text-orange-500 mb-2">{course.courseName}</h2>
                  <p className="text-gray-600 font-semibold mt-2">{course.courseDescription}</p>
                  <div className="mt-4">
                    <p className="text-gray-500">Level: {course.courseLevel}</p>
                    <p className="text-gray-500">Duration: {course.courseDuration}</p>
                    <p className="text-gray-500">Materials: {course.requiredMaterials}</p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => addCourseToUser(course._id)}  
                      className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full"
                    >
                      Add Course
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ProfilePage;
















