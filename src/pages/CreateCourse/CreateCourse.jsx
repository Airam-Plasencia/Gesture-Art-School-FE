import { useState } from "react";
import axios from "axios";

function CreateCourseForm({ setCourses }) {
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    teacher: "",
    duration: "",
    level: "",
    materials: "",
    image: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setCourseData({
      ...courseData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", courseData.title);
    formData.append("description", courseData.description);
    formData.append("teacher", courseData.teacher);
    formData.append("duration", courseData.duration);
    formData.append("level", courseData.level);
    formData.append("materials", courseData.materials);
    formData.append("image", courseData.image);

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/courses`, formData)
      .then((response) => {
        console.log("Curso creado con éxito:", response.data);
        setCourses((prevCourses) => [response.data, ...prevCourses]); // Añadimos el curso al estado
      })
      .catch((err) => {
        console.error("Error al crear el curso:", err.response ? err.response.data : err.message);
      });
  };

  return (
    <div
      className="h-screen bg-cover bg-no-repeat bg-right"
      style={{
        backgroundImage: `url("https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/940417/settings_images/f2181a6-f533-0dea-db6d-55df5d62b4a_IMG_0461.JPG")`,
      }}
    >
      <div className="bg-white bg-opacity-80 h-full flex justify-center items-center">
        
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-6">Create a New Course</h2>

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
            <input
              type="text"
              id="teacher"
              name="teacher"
              value={courseData.teacher}
              onChange={handleInputChange}
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter teacher's name"
              required
            />
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
              Course Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            Create Course
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateCourseForm;





