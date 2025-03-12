import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditCourseForm() {
    const [courseData, setCourseData] = useState({
        title: "",
        description: "",
        teacher: "",
        duration: "",
        level: "",
        materials: "",
        image: "",
    });

    const [teachers, setTeachers] = useState([]);
    const { courseId } = useParams(); // Obtener el ID del curso desde la URL
    const navigate = useNavigate(); // Para redirigir después de editar

    useEffect(() => {
        // Obtener el curso por ID
        axios
            .get(`${process.env.REACT_APP_SERVER_URL}/courses/${courseId}`)
            .then((response) => {
                setCourseData({
                    title: response.data.courseName,
                    description: response.data.courseDescription,
                    teacher: response.data.instructor,
                    duration: response.data.courseDuration,
                    level: response.data.courseLevel,
                    materials: response.data.requiredMaterials,
                    image: response.data.image,
                });
            })
            .catch((error) => {
                console.error("Error al obtener los detalles del curso:", error);
            });

        // Obtener la lista de instructores
        axios
            .get(`${process.env.REACT_APP_SERVER_URL}/teachers`)
            .then((response) => {
                setTeachers(response.data);
            })
            .catch((error) => {
                console.error("Error al obtener los instructores:", error);
            });
    }, [courseId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourseData({
            ...courseData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const courseDataToSend = {
            courseName: courseData.title,
            courseDescription: courseData.description,
            courseLevel: courseData.level,
            courseDuration: courseData.duration,
            requiredMaterials: courseData.materials,
            instructor: courseData.teacher,
            image: courseData.image,
        };

        const token = localStorage.getItem("authToken");

        if (!token) {
            alert("No se encontró el token de autenticación. Por favor, inicie sesión.");
            return;
        }

        axios
            .put(`${process.env.REACT_APP_SERVER_URL}/admin/courses/${courseId}`, courseDataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log("Curso actualizado con éxito:", response.data);
                navigate("/courses"); // Redirigir a la lista de cursos después de editar
            })
            .catch((err) => {
                console.error("Error al actualizar el curso:", err.response ? err.response.data : err.message);
                alert(`Error al actualizar el curso: ${err.response?.data?.message || "Error desconocido"}`);
            });
    };

    return (
        <div className="h-screen flex">
            <div
                className="w-1/2  bg-cover bg-no-repeat bg-left"
                style={{
                    backgroundImage: `url("https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/themes/563415/settings_images/YIlDSSOeSui4ssjqKL9w_Screen_Shot_2020-03-22_at_5.22.41_PM.png")`,
                }}
            />
            <div className="flex-1 bg-white bg-opacity-80 flex justify-center items-center">
                <form
                    onSubmit={handleSubmit}
                    className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg"
                >
                    <h2 className="text-2xl font-semibold text-center text-orange-500 mb-6">
                        Edit Course
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
                                    {`${teacher.firstName} ${teacher.lastName}`}
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
                            placeholder="Enter course level"
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
                            placeholder="Enter required materials"
                            required
                        />
                    </div>

                    {/* Image */}
                    <div className="mb-5">
                        <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900">
                            Course Image
                        </label>
                        <input
                            type="text"
                            id="image"
                            name="image"
                            value={courseData.image}
                            onChange={handleInputChange}
                            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Enter course image URL"
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
                                Update Course
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditCourseForm;
