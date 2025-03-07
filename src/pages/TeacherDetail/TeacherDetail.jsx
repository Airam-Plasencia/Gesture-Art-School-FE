import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function TeacherDetail() {
  const { teacherId } = useParams(); // Obtener el ID del profesor de la URL
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/teachers/${teacherId}`)
      .then(response => {
        setTeacher(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Error al cargar los detalles del profesor');
        setLoading(false);
      });
  }, [teacherId]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!teacher) {
    return <div>No se encontró el profesor.</div>;
  }

  return (
    <div className="p-6 space-y-6">
      
      <div
        className="relative w-full h-72 bg-cover bg-center"
        style={{ backgroundImage: `url(${teacher.image})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h2 className="text-4xl font-bold text-white">{teacher.firstName} {teacher.lastName}</h2>
        </div>
      </div>

      
      <div className="mt-6">
        <h3 className="text-2xl font-semibold">Programa: {teacher.program}</h3>
        <p className="mt-4">{teacher.background}</p>
        <h4 className="mt-4 font-semibold">Cursos:</h4>
        {teacher.courses && teacher.courses.length > 0 ? (
          <ul className="list-none pl-5">
            {teacher.courses.map((course, index) => (
              <li key={course._id}>Curso {course["0"]}</li>
            ))}
          </ul>
        ) : (
          <p>No hay cursos disponibles</p>
        )}
      </div>
    </div>
  );
}

export default TeacherDetail;

