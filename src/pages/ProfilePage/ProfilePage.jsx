import React, { useState, useEffect } from 'react';
import "./ProfilePage.css";

function ProfilePage() {
  const [addedCourses, setAddedCourses] = useState([]);

  useEffect(() => {
    // Recuperamos los cursos añadidos desde el localStorage
    const storedCourses = JSON.parse(localStorage.getItem('addedCourses'));
    if (storedCourses) {
      setAddedCourses(storedCourses);
    }
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center text-blue-500 mb-8">Your Profile</h1>
      <h2 className="text-xl font-semibold text-orange-500">Your Added Courses:</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {addedCourses.length === 0 ? (
          <p>No courses added yet</p>
        ) : (
          addedCourses.map((course, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all">
              <h2 className="text-2xl font-semibold text-orange-500">{course.courseName}</h2>
              <p className="text-gray-600 font-semibold mt-2">{course.courseDescription}</p>
              <div className="mt-4">
                <p className="text-gray-500">Level: {course.courseLevel}</p>
                <p className="text-gray-500">Duration: {course.courseDuration}</p>
                <p className="text-gray-500">Materials: {course.requiredMaterials}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
