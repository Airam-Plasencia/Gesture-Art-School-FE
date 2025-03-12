import { useState, useEffect } from "react";
import axios from "axios";

function CreateCourseForm({ setCourses }) {
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    teacher: "", // Aquí guardaremos el ID del instructor
    duration: "",
    level: "",
    materials: "",
    image: "", // Aquí almacenamos la URL de la imagen
  });

  const [teachers, setTeachers] = useState([]); // Estado para almacenar los instructores

  useEffect(() => {
    // Obtener la lista de instructores desde el backend
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/teachers`) // Ruta del backend para obtener los instructores
      .then((response) => {
        setTeachers(response.data); // Guardar los instructores en el estado
      })
      .catch((error) => {
        console.error("Error al obtener los instructores:", error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Crear el objeto con los datos del curso
    const courseDataToSend = {
      courseName: courseData.title,
      courseDescription: courseData.description,
      courseLevel: courseData.level,
      courseDuration: courseData.duration,
      requiredMaterials: courseData.materials,
      instructor: courseData.teacher, // El ID del instructor
      image: courseData.image,
    };

    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("No se encontró el token de autenticación. Por favor, inicie sesión.");
      return;
    }

    // Enviar los datos al backend
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/admin/courses`, courseDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`, // Incluir el token de autenticación
        },
      })
      .then((response) => {
        console.log("Curso creado con éxito:", response.data);
        setCourses((prevCourses) => [response.data, ...prevCourses]); // Añadir el nuevo curso
      })
      .catch((err) => {
        console.error("Error al crear el curso:", err.response ? err.response.data : err.message);
        alert(`Error al crear el curso: ${err.response?.data?.message || "Error desconocido"}`);
      });
  };

  return (
    <div className="h-screen flex">
      {/* Contenedor de imagen de fondo a la izquierda */}
      <div
        className="w-1/2 bg-cover bg-no-repeat bg-left"
        style={{
          backgroundImage: `url("https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/940417/settings_images/f2181a6-f533-0dea-db6d-55df5d62b4a_IMG_0461.JPG")`,
        }}
      />
      {/* Contenedor para el formulario */}
      <div className="flex-1 bg-white bg-opacity-80 flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-center text-orange-500 mb-6">
            Create a New Course
          </h2>

          {/* Course Title */}
          <div className="mb-5">
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">
              Course Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={courseData.title}
              onChange={handleInputChange}
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter course title"
              required
            />
          </div>

          {/* Course Description */}
          <div className="mb-5">
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">
              Course Description
            </label>
            <textarea
              id="description"
              name="description"
              value={courseData.description}
              onChange={handleInputChange}
              rows="4"
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter course description"
              required
            />
          </div>

          {/* Teacher */}
          <div className="mb-5">
            <label htmlFor="teacher" className="block mb-2 text-sm font-medium text-gray-900">
              Teacher
            </label>
            <select
              name="teacher"
              value={courseData.teacher}
              onChange={handleInputChange}
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            >
              <option value="" disabled>Select a teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {`${teacher.firstName} ${teacher.lastName}`} {/* Asumiendo que el campo 'name' contiene el nombre del instructor */}
                </option>
              ))}
            </select>
          </div>

          {/* Course Duration */}
          <div className="mb-5">
            <label htmlFor="duration" className="block mb-2 text-sm font-medium text-gray-900">
              Duration (in weeks)
            </label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={courseData.duration}
              onChange={handleInputChange}
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter course duration"
              required
            />
          </div>

          {/* Level */}
          <div className="mb-5">
            <label htmlFor="level" className="block mb-2 text-sm font-medium text-gray-900">
              Level
            </label>
            <input
              type="text"
              id="level"
              name="level"
              value={courseData.level}
              onChange={handleInputChange}
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter course level (e.g., Beginner, Intermediate)"
              required
            />
          </div>

          {/* Materials */}
          <div className="mb-5">
            <label htmlFor="materials" className="block mb-2 text-sm font-medium text-gray-900">
              Materials
            </label>
            <input
              type="text"
              id="materials"
              name="materials"
              value={courseData.materials}
              onChange={handleInputChange}
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter materials (e.g., Charcoal, Paper, Eraser)"
              required
            />
          </div>

          {/* Course Image */}
          <div className="mb-5">
            <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900">
              Course Image (URL)
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={courseData.image}
              onChange={handleInputChange}
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter image URL"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mb-5">
            <button
              type="submit"
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                Create Course
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCourseForm;






