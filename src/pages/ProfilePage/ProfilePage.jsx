import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/auth.context';

function ProfilePage() {
  const [addedCourses, setAddedCourses] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext); 
  const userId = user ? user._id : null; 

  useEffect(() => {
    if (!userId) {
      setError('No userId found in context');
      return;  
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('No token found');
      return;  
    }

    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAddedCourses(response.data.courses);
      })
      .catch((err) => {
        console.error('Error al cargar los cursos:', err.response ? err.response.data : err.message);
        setError('Error al cargar los cursos del perfil.');
      });
  }, [userId]);

  // Función para remover un curso de la vista
  const removeCourseFromView = (courseId) => {
    // Actualizamos el estado eliminando el curso de la lista localmente
    setAddedCourses(addedCourses.filter(course => course._id !== courseId));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center text-blue-500 mb-8">Your Profile</h1>
      
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      <h2 className="text-xl font-semibold text-orange-500">Your Added Courses:</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {addedCourses.length === 0 ? (
          <p>No courses added yet</p>
        ) : (
          addedCourses.map((course) => (
            <div key={course._id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all">
              {/* Mostrar la imagen del curso */}
              {course.image && (
                <img
                  src={course.image}
                  alt={course.courseName}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}

              <h2 className="text-2xl font-semibold text-orange-500">{course.courseName}</h2>
              <p className="text-gray-600 font-semibold mt-2">{course.courseDescription}</p>
              <div className="mt-4">
                <p className="text-gray-500">Level: {course.courseLevel}</p>
                <p className="text-gray-500">Duration: {course.courseDuration}</p>
                <p className="text-gray-500">Materials: {course.requiredMaterials}</p>
              </div>

              {/* Botón de eliminar curso de la vista (sin eliminarlo de la base de datos) */}
              <button
                onClick={() => removeCourseFromView(course._id)}
                className="mt-4 inline-flex items-center justify-center p-2 text-sm font-medium text-red-900 rounded-lg bg-red-100 hover:bg-red-200 focus:ring-4 focus:outline-none focus:ring-red-300"
              >
                Remove Course
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProfilePage;








