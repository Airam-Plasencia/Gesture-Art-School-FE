import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="teacher-list">
      <h2 className="text-3xl font-bold text-blue-500 text-center">Our Teachers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {teachers.map(teacher => (
          <div key={teacher._id} className="bg-white text-orange-500 shadow-lg rounded-lg p-6">
            <Link to={`/teachers/${teacher._id}`} className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">

              <img
                src={teacher.image}
                alt={`${teacher.firstName} ${teacher.lastName}`}
                className="w-32 h-32 object-cover rounded-full"
              />

              <div className="flex-1">
                <h3 className="text-xl font-semibold">{teacher.firstName} {teacher.lastName}</h3>
                <p className="text-gray-700 font-semibold">{teacher.program}</p>
                <p className="text-gray-700 mt-2 font-semibold">{teacher.background}</p>
                <p className="text-gray-500 mt-2">{teacher.email}</p>
                <p className="text-gray-500">{teacher.phone}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-white p-6 rounded-lg flex items-center space-x-6">
        {/* Imagen más grande */}
        <img
          src="https://images.squarespace-cdn.com/content/v1/5b36001250a54ff3fd2787b9/1611047828875-GPZO097XRMYYUZI8PAZ5/th3kpX0QbqfZ1M7hLBUI_Screen_Shot_2018-10-01_at_10.21.37_PM.png"
          alt="Experience"
          className="w-48 h-48 object-cover rounded-md"
        />

        <div className="flex-1">
          <p className="text-xl font-semibold text-orange-600">Mike Mattesi with 25 years of experience</p>
          <p className="text-gray-600 mt-2 font-semibold text-justify">
            Experienced in animation, video games, advertising, education and IP development. My focus now is on art and creativity, helping teams to find premium and creative visual concepts.
            He has worked with clients such as Pixar, Walt Disney Feature Animation, Marvel Comics, Hasbro Toys, among others.
          </p>
        </div>
      </div>



      <div className="mt-6 flex justify-center space-x-6">
        <img
          src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjC2j3BMo2jOb8lkl_mqeu_dB55KPfpVzLLcVyBDilO4vUp59S4JoFRGXrkMPLAyi1KExZjmqU4-DL8NPryichO1lKQv-uucMwDAQIrVHP1xFuOREg6XvkUtGlFCtKXV6eJ_DJwzgnD7io/s320/F001-028.tif"
          alt="Additional 1"
          className="w-48 h-auto"
        />

        <img
          src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjF-q9BlZ1OsSGmn_sERhs80JegeVeo-LuOGY2ZniJ4YittMeoMzU-MpA2D8PKOJ3b-SBefwPms6N8vvWFGcuFCaQ5LgjVeXPouq8GJdYFgfPfXcXY1DAEAej0KuR-it8B99aoRGMB7fQI/s1600/F001-041.tif"
          alt="Additional 2"
          className="w-48 h-auto"
        />

        <img
          src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg0tQ_tg6mPXLVf-JVedfR5ak_ig3EuXc0-BlsywGiEbbWphs4BptiqMRf9b549rUDrVY9UglazqdrC9JsMjjz_SPKoipa3kAeImWezZRRK9eDxLuCja4_wtXW_5xTTigjF7mF6zqaiRlY/s1600/F001-033.tif"
          alt="Additional 2"
          className="w-48 h-auto"
        />
      </div>
      
      <div className="mt-12 bg-white p-6 rounded-lg flex items-center space-x-6">
        <div className="flex-1">
          <p className="text-xl font-semibold text-orange-600">Glen Keane </p>
          <p className="text-gray-600 mt-2 font-semibold text-justify">
            Glen Keane Productions is a creative home for artists to pursue projects that are inherently good, beautiful, and true. We strive to push the boundaries of storytelling through visionary artistry and encourage diverse voices and talent in animation.
            <br /><br />
            Our directors and producers have lent their skills to a variety of films in different mediums, including Paperman, June, Duet, Age of Sail, and Dear Basketball. And, more recently, the animated preschool series Trash Truck, which was nominated for a Daytime Emmy Award, and the Academy Award-nominated animated feature Over the Moon.
          </p>
        </div>

        <img
          src="https://blog.siggraph.org/wp-content/uploads/2020/11/SA20-Keynote.jpg"
          alt="Glen Keane Productions"
          className="w-48 h-48 object-cover rounded-md"
        />
      </div>



      {/* Footer */}
      <div className="bg-gray-800 text-white py-8">
        <div className="max-w-screen-xl mx-auto text-center">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <a href="/" className="flex items-center justify-center md:justify-start">
                <span className="ml-4 text-3xl font-bold">
                  <span className="text-blue-500">Gesture</span>{' '}
                  <span className="text-orange-500">Art</span>{' '}
                  <span className="text-gray-500">School</span>
                </span>
              </a>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-300 uppercase">Resources</h2>
                <ul className="text-gray-400 font-medium">
                  <li className="mb-4">
                    <a href="https://flowbite.com/" className="hover:underline">Flowbite</a>
                  </li>
                  <li>
                    <a href="https://tailwindcss.com/" className="hover:underline">Tailwind CSS</a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-300 uppercase">Follow us</h2>
                <ul className="text-gray-400 font-medium">
                  <li className="mb-4">
                    <a href="https://github.com/Airam-Plasencia" className="hover:underline">Github</a>
                  </li>
                  <li>
                    <a href="https://discord.gg/4eeurUVvTy" className="hover:underline">Discord</a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-300 uppercase">Legal</h2>
                <ul className="text-gray-400 font-medium">
                  <li className="mb-4">
                    <a href="https://www.privacypolicytemplate.net/assets/images/privacy-policy-template.png" className="hover:underline">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="https://www.termsfeed.com/public/uploads/2021/12/sample-terms-conditions-agreement-screenshot-2.jpg" className="hover:underline">Terms & Conditions</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />

          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-400 sm:text-center">
              © 2025 GestureArtSchool.com
            </span>
            <div className="flex mt-4 sm:justify-center sm:mt-0">
              <a
                href="https://github.com/Airam-Plasencia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white mx-3"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 8 19"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Github</span>
              </a>
              <a
                href="https://discord.com/"
                className="text-gray-400 hover:text-white mx-3"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 21 16"
                >
                  <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
                </svg>
                <span className="sr-only">Discord</span>
              </a>
              <a
                href="https://x.com/"
                className="text-gray-400 hover:text-white mx-3"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 17"
                >
                  <path fillRule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" />
                </svg>
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Teachers;



