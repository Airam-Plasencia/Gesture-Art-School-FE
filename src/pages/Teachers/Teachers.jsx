import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/teachers`) 
       .then(response => {
        setTeachers(response.data); 
        setLoading(false); 
      })
      .catch(err => {
        setError('Error al cargar los datos');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center text-xl">Cargando...</div>; 
  }

  if (error) {
    return <div className="text-center text-xl text-red-500">{error}</div>; 
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold text-center">Nuestros Profesores</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((teacher) => (
          <div key={teacher.email} className="bg-white shadow-lg rounded-lg p-4">
            <img
              src={teacher.image}
              alt={`${teacher.firstName} ${teacher.lastName}`}
              className="w-full h-48 object-cover rounded-md"
            />
            <div className="mt-4">
              <h3 className="text-xl font-semibold">{teacher.firstName} {teacher.lastName}</h3>
              <p className="text-gray-600">{teacher.program}</p>
              <p className="text-gray-600">{teacher.background}</p>
              <a
                href={teacher.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 mt-2 block"
              >
                Ver LinkedIn
              </a>
              <div className="mt-4">
                <h4 className="font-semibold">Cursos:</h4>
                {teacher.courses && teacher.courses.length > 0 ? (
                  <ul className="list-disc pl-5">
                    {teacher.courses.map((course, index) => (
                      <li key={course._id}>Curso {course["0"]}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No hay cursos disponibles</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teachers;

