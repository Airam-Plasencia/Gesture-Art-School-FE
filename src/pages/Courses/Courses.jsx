import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true); // Mantener el estado loading
  const [error, setError] = useState(null);    
  const [userId] = useState("1");  

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/courses`)
      .then(response => {
        setCourses(response.data);
        setLoading(false);  // Cuando los cursos se cargan, ponemos loading en false
      })
      .catch(err => {
        setError('Error al cargar los datos');
        setLoading(false);  // Si hay error, también se pone loading en false
      });
  }, []);

  const addCourseToProfile = (courseId) => {
    const token = localStorage.getItem('authToken');  
    if (!token) {
      console.error("No token found");  
      setError("No token found");  
      return;  
    }
  
    axios.post(`${process.env.REACT_APP_SERVER_URL}/users/${userId}/courses`, { courseId }, {
      headers: {
        Authorization: `Bearer ${token}`  
      }
    })
    .then(response => {
      console.log('Curso añadido correctamente:', response.data);  
    })
    .catch(err => {
      console.error('Error al añadir curso:', err.response ? err.response.data : err.message);  
      setError("Hubo un problema al añadir el curso. Intenta nuevamente.");  
    });
  };

  // Mostrar el mensaje de carga si `loading` es verdadero
  if (loading) {
    return <div className="text-center text-lg text-blue-500">Cargando cursos...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center text-blue-500 mb-8">Available Courses</h1>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>} {/* Mostrar error si hay */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course._id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all">
            <h2 className="text-2xl font-semibold text-orange-500">{course.courseName}</h2>
            <p className="text-gray-600 font-semibold mt-2">{course.courseDescription}</p>
            <div className="mt-4">
              <p className="text-gray-500">Level: {course.courseLevel}</p>
              <p className="text-gray-500">Duration: {course.courseDuration}</p>
              <p className="text-gray-500">Materials: {course.requiredMaterials}</p>
            </div>
            <button 
              onClick={() => addCourseToProfile(course._id)} 
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Add Course
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;



