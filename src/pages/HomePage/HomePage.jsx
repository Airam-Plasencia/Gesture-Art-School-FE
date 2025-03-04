import React from 'react';

function HomePage() {
  return (
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
          className="max-w-full h-auto"
        />
      </div>
    </div>
  );
}

export default HomePage;

