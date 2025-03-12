import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import userService from "../../services/users.service";

function ProfilePage() {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      userService.getUsers(user._id)
        .then((response) => {
          setUserProfile(response.data);
          setLoading(false);
        })
        .catch((err) => {
          setError("Error al cargar el perfil");
          setLoading(false);
        });
    }
  }, [user, navigate]);

  const handleDeleteCourse = (courseId) => {
    // Aquí puedes filtrar el curso que se eliminará (solo en el front-end)
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      courses: prevProfile.courses.filter(course => course._id !== courseId),
    }));

    // Actualiza el backend (opcional si necesitas persistir el cambio)
    const token = localStorage.getItem("authToken");
    if (token) {
      axios
        .put(
          `${process.env.REACT_APP_SERVER_URL}/users/${user._id}`,
          { courses: userProfile.courses },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log("Perfil actualizado:", response.data);
        })
        .catch((err) => {
          console.error("Error al actualizar el perfil:", err);
        });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!userProfile) {
    return <div>No se encontró el perfil del usuario.</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-center items-center mb-8">
        <img
          src={userProfile.profileImage || "default-avatar.jpg"}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover"
        />
      </div>
      <h1 className="text-3xl font-semibold text-center mb-8">My Courses</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userProfile?.courses.length === 0 ? (
          <div className="col-span-3 text-center text-gray-500">
            No courses added yet.
          </div>
        ) : (
          userProfile.courses.map((course) => (
            <div
              key={course._id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <img
                src={course.image}
                alt={course.courseName}
                className="w-56 h-64 object-cover rounded-md mb-4"
              />
              <h2 className="text-2xl font-semibold text-orange-500">{course.courseName}</h2>
              <p className="text-gray-600 mt-2">{course.courseDescription}</p>
              <div className="mt-4">
                <p className="text-gray-500">Level: {course.courseLevel}</p>
                <p className="text-gray-500">Duration: {course.courseDuration}</p>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => handleDeleteCourse(course._id)} // Llamamos la función al hacer click
                  className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Delete Course
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProfilePage;




















