import React, { useState, useEffect } from 'react';
import axios from 'axios';


function Courses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/courses`)  
            .then(response => {
                setCourses(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error al cargar los datos');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-semibold text-center text-blue-500 mb-8">Avaible Courses</h1>
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
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Courses;
