import React, { useState, useEffect } from 'react';

function HomePage() {

  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    'https://static.wixstatic.com/media/c2d311_288f5f54ad73440ebcc92fa63cfe0396~mv2.jpg/v1/fill/w_1225,h_700,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/c2d311_288f5f54ad73440ebcc92fa63cfe0396~mv2.jpg',
    'https://static.wixstatic.com/media/c2d311_2470ee383fb2422eb01c8ebb7df8b315~mv2.jpg/v1/fill/w_1225,h_700,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/c2d311_2470ee383fb2422eb01c8ebb7df8b315~mv2.jpg',
    'https://64.media.tumblr.com/368195ef71631d1658d8b0100a2b656b/tumblr_pg67lzYsPS1qetpbso1_1280.png',
    'https://static.wixstatic.com/media/c2d311_1b548556ccfe4876969e3d89c17e4823~mv2.jpg/v1/fill/w_1225,h_700,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/c2d311_1b548556ccfe4876969e3d89c17e4823~mv2.jpg',
  ];


  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };


  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 9000);
    return () => clearInterval(interval);
  }, []);

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
            alt="Artist Image"
            className="w-full h-auto"
          />
        </div>
        <div className="w-1/2 pl-10 text-gray-800">
          <h3 className="text-3xl font-semibold mb-4">02: Courses</h3>
          <p className="text-lg">
            Figure drawing not only enhances your understanding of anatomy, but also unlocks creative expression, opening doors to numerous art careers. Whether you want to be a storyboard artist, character designer, or an animator, mastering figure drawing gives you the skills and confidence to pursue your dream career. With personal mentorship and tailored lessons, we help you grow at your own pace and achieve your goals.
          </p>
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
          <p className="text-sm">
            © 2025 GestureArtSchool.com
          </p>
          <p className="text-sm mt-2">
            by Airam Plasencia on{' '}
            <a href="https://github.com/Airam-Plasencia" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              Github
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;


