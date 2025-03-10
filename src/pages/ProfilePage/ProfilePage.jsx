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

  // Función para eliminar curso de la vista (no de la base de datos)
  const removeCourseFromView = (courseId) => {
    setAddedCourses((prevCourses) =>
      prevCourses.filter((course) => course._id !== courseId)
    );
  };

  return (
    <div className="container mx-auto p-6">
      {/* Tooltip and Profile Title */}
      <div className="relative">
          <div
            id="tooltip-bonnie"
            role="tooltip"
            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700"
          >
            Bonnie Green
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
          {/* Avatar Image from external URL */}
          <img
            data-tooltip-target="tooltip-bonnie"
            className="w-44 h-44 rounded-full inline-block ml-3" // Cambié `rounded-sm` por `rounded-full`
            src="https://w0.peakpx.com/wallpaper/685/815/HD-wallpaper-artstation-women-portrait-display-digital-painting-eyelashes-black-background-fan-art-digital-art-artwork-lea-bichlmaier-profile.jpg"
            alt="Profile Avatar"
          />
        
      </div>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <br></br>
      <h2 className="text-xl font-semibold text-orange-500">Your Added Courses:</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {addedCourses.length === 0 ? (
          <p>No courses added yet</p>
        ) : (
          addedCourses.map((course) => (
            <div key={course._id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all">
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

              <br></br>
              <button
                type="button"
                onClick={() => removeCourseFromView(course._id)}
                className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
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












