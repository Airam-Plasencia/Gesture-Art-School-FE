import React from "react";

function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col">


            <div className="relative min-h-screen bg-cover bg-center " style={{ backgroundImage: "url('https://images.squarespace-cdn.com/content/v1/5edc0fca707a742b6f9cae65/1599913877855-52ABJ7QEK3J7DANK93Y2/ParisBalletStills-14.jpg')" }}>


                <div className="absolute inset-0  "></div>


                <div className="relative z-10 p-8 max-w-4xl mx-auto text-center text-white">
                    <h1 className="text-4xl text-blue-700 font-bold mb-8">About Airam Plasencia</h1>

                    <p className="text-lg leading-relaxed text-orange-900 text-justify mb-6">
                        Airam contributed his skills as a professional artist over five years on numerous award-winning projects in varied capacities in animated film, tv series, and anime. He collaborated with Anima Kitchent, Six Point Harness and Tulipop.
                    </p>
                    <p className="text-lg leading-relaxed text-orange-900 text-justify mb-6">
                    Simultaneously, the idea of this project came to me a desire to go to Pasadena, California to study in an art school, then I thought of making my own school linked to that goal. This way I would have the subjects and teachers that I would like to have.
                    </p>
                    <p className="text-lg leading-relaxed text-orange-900 text-justify mb-8">
                        Contact him at:
                    </p>
                    <p className="text-lg leading-relaxed text-orange-900 text-justify mb-8">
                        Art Center College of Design
                        4.5(122) - Art school
                        More than 90 years in business - Pasadena, CA, USA
                    </p>
                    <div className="text-lg leading-relaxed text-orange-900 text-justify">
                        <p className="mb-4">Website: <a href="http://Gesture-Art-School.com" className="text-blue-600 hover:underline">Gesture-Art-School.com</a></p>
                        <p className="mb-4">Facebook: <a href="https://www.facebook.com/gesture-Art-School" className="text-blue-600 hover:underline">Gesture-Art-School with Airam Plasencia</a></p>
                        <p className="mb-4">Instagram: <a href="https://www.instagram.com/gesture-Art-School" className="text-blue-600 hover:underline">gesture-artschool</a></p>
                        <p className="mb-4">Email: <a href="mailto:aira@gestureart.com" className="text-blue-600 hover:underline">aira@gestureart.com</a></p>
                    </div>
                </div>

            </div>


            <div className="bg-gray-800 text-white py-8 ">
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
        </div >
    );
}

export default AboutPage;