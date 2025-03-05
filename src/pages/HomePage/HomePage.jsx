import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

function HomePage() {

  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    'https://static.wixstatic.com/media/c2d311_288f5f54ad73440ebcc92fa63cfe0396~mv2.jpg/v1/fill/w_1225,h_700,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/c2d311_288f5f54ad73440ebcc92fa63cfe0396~mv2.jpg',
    'https://static.wixstatic.com/media/c2d311_2470ee383fb2422eb01c8ebb7df8b315~mv2.jpg/v1/fill/w_1225,h_700,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/c2d311_2470ee383fb2422eb01c8ebb7df8b315~mv2.jpg',
    'https://64.media.tumblr.com/368195ef71631d1658d8b0100a2b656b/tumblr_pg67lzYsPS1qetpbso1_1280.png',
    'https://static.wixstatic.com/media/c2d311_1b548556ccfe4876969e3d89c17e4823~mv2.jpg/v1/fill/w_1225,h_700,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/c2d311_1b548556ccfe4876969e3d89c17e4823~mv2.jpg',
  ];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 9000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div>

      <div className="flex items-center justify-between p-10">
        <div className="w-1/2">
          <h2 className="text-blue-500 text-4xl font-semibold mb-4">
            Figure Drawing Lessons
          </h2>
          <p className="text-gray-700 text-xl">
            THE BEST METHOD FOR BEGINNERS <br />
            TO BECOME A PROFESSIONAL ARTIST
          </p>
        </div>

        <div className="w-1/2">
          <img
            src="/img/home1.jpg"
            alt="Figure Drawing"
            className="max-w-md h-auto"
          />
        </div>
      </div>


      <div className="bg-gray-700 text-white py-10">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto">
          <div className="w-1/2">
            <img
              src="/img/home2.jpg"
              alt="Why Choose Figure Drawing?"
              className="max-w-md h-auto"
            />
          </div>

          <div className="w-1/2 pl-10">
            <h3 className="text-orange-500 text-3xl font-semibold mb-4">
              Why Choose Figure Drawing?
            </h3>
            <p className="text-lg">
              Artists of the Figure drawing approach move on to many different careers in the arts such as storyboard artist, Character Designer, Visual Development Artist, Comic Book Artist, Animator, Illustrator, and Caricaturist. Some enroll to improve their drawing skills as their personal hobby. Keep reading to learn more about the FORCE Drawing memberships, courses and personal mentorship options!
            </p>
          </div>
        </div>
      </div>


      <div className="py-20 relative">
        <div className="max-w-screen-xl mx-auto px-10 text-black flex items-center justify-between">
          <div className="bg-gray w-1/2 pr-10">
            <h3 className="text-3xl font-semibold mb-4">01: Mentorship</h3>
            <p className="text-lg">
              Do you feel stuck in your art education, frustrated with watching videos, trying to follow along and not getting anywhere? We start with a personal interview so we get to know who you are and then best support you.
            </p>
            <Link to="/teachers">
              <button className="mt-4 px-6 py-2 bg-blue-500 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                View More
              </button>
            </Link>
          </div>

          <div>
            <img
              src="/img/home3.jpg"
              alt="Mentorship"
              className="w-full h-auto opacity-80"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between py-20 max-w-screen-xl mx-auto px-10">
        <div className="w-1/2">
          <img
            src="https://static.wixstatic.com/media/c2d311_7a0fa713906c44b79d5ef5ec19e600c2~mv2.jpg/v1/fill/w_1225,h_700,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/c2d311_7a0fa713906c44b79d5ef5ec19e600c2~mv2.jpg"
            alt="Portrait of the artist"
            className="w-full h-auto"
          />
        </div>
        <div className="w-1/2 pl-10 text-gray-800">
          <h3 className="text-3xl font-semibold mb-4">02: Courses</h3>
          <p className="text-lg">
            Figure drawing not only enhances your understanding of anatomy, but also unlocks creative expression, opening doors to numerous art careers. Whether you want to be a storyboard artist, character designer, or an animator, mastering figure drawing gives you the skills and confidence to pursue your dream career. With personal mentorship and tailored lessons, we help you grow at your own pace and achieve your goals.
          </p>
          <Link to="/courses">
            <button className="mt-4 px-6 py-2 bg-blue-500 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              View More
            </button>
          </Link>
        </div>
      </div>

      <div className="py-20 bg-gray-100">
        <h2 className="text-2xl text-center text-orange-500 font-bold mb-4">
          If you are offered the opportunity to do something that you don’t know how to do – say yes, dive in and do it anyway.
        </h2>
        <p className="text-center text-orange-500 font-bold text-xl">
          - Glen Keane
        </p>
        <div className="relative w-full max-w-4xl mx-auto">
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="w-full h-auto rounded-lg shadow-lg transition-all duration-700 ease-in-out"
          />
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full opacity-50 hover:opacity-100"
          >
            &#60;
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full opacity-50 hover:opacity-100"
          >
            &#62;
          </button>
        </div>
      </div>


      <div className="bg-gray-800 text-white py-4">
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

      export default HomePage;



