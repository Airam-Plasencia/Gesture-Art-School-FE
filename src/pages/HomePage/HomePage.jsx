import React from 'react';

function HomePage() {
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
         
          <div className="w-1/2 pr-10">
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
    </div>
  );
}

export default HomePage;

