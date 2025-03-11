import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);  // Obtenemos logOutUser desde el contexto
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Estado para verificar si el usuario es Admin

  // Verificamos si el usuario tiene el rol de 'admin'
  useEffect(() => {
    if (user && user.role === 'admin') {
      setIsAdmin(true);
    }
  }, [user]);

  const isLoginOrSignupPage = location.pathname === "/login" || location.pathname === "/signup";

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logOutUser();  // Llama a logOutUser para cerrar sesión
    setIsDropdownOpen(false);  // Cierra el dropdown
  };

  return (
    <nav className={`p-4 ${isLoginOrSignupPage ? 'hidden' : ''}`}>
      <div className="flex items-center justify-between">
        {/* Logo y título */}
        <div className="flex items-center">
          <img src="/img/logo.png" alt="Logo" className="h-40 max-w-sm" />
          <span className="ml-4 text-3xl font-bold mb-2">
            <span className="text-blue-500">Gesture</span>{' '}
            <span className="text-orange-500">Art</span>{' '}
            <span className="text-gray-500">School</span>
          </span>
        </div>

        {/* Menú de navegación */}
        <div className="flex space-x-6 ml-0 mt-8 mr-20">
          <Link to="/">
            <button className="text-gray hover:text-orange-500 mt-2">Home</button>
          </Link>
          <Link to="/courses" className="text-gray hover:text-orange-500 mt-2">
            Courses
          </Link>
          <Link to="/teachers" className="text-gray hover:text-orange-500 mt-2">
            Teachers
          </Link>
          <Link to="/about" className="text-gray hover:text-orange-500 mt-2">
            About
          </Link>
          <Link to="/gallery" className="text-gray hover:text-orange-500 mt-2">
            Gallery
          </Link>

          {/* Crear Curso (solo visible para Admin) */}
          {isAdmin && (
            <Link to="/create-course" className="text-gray hover:text-orange-500 mt-2">
              Create Course
            </Link>
          )}

          {/* Imagen de perfil y Dropdown */}
          <div className="flex items-center space-x-4 ml-0 mt-2 relative">
            {isLoggedIn ? (
              <>
                {/* Imagen de perfil */}
                <img
                  onClick={toggleDropdown}
                  className="w-12 h-12 rounded-full cursor-pointer mb-1"
                  src={user.profileImage || "https://w0.peakpx.com/wallpaper/685/815/HD-wallpaper-artstation-women-portrait-display-digital-painting-eyelashes-black-background-fan-art-digital-art-artwork-lea-bichlmaier-profile.jpg"}
                  alt="Profile Avatar"
                />

                {isDropdownOpen && (
                  <div className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600 mt-52 left-[-5px]">
                    <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                      <div>{user.name}</div>
                      <div className="font-medium truncate">{user.email}</div>
                    </div>
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                      <li>
                        <Link to="/profile">
                          <button className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            Profile
                          </button>
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <>
                <Link to="/signup">
                  <button className="text-gray hover:text-orange-500 mb-2">Sign Up</button>
                </Link>
                <Link to="/login">
                  <button className="text-gray hover:text-orange-500 mb-2">Login</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;







