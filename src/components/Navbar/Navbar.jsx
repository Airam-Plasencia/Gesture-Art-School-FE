import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="p-4">
      <div className="flex items-center justify-between">
        
        <div className="flex items-center mr-2">
          <img src="/img/logo.png" alt="Logo" className="h-40 max-w-sm" />
        </div>

        {/* Links */}
        <div className="flex space-x-6 mx-auto">
        <Link to="/">
          <button className="text-gray hover:text-gray-300">Home</button>
        </Link>
          <Link to="/" className="text-gray hover:text-gray-300">Courses</Link>
          <Link to="/teachers" className="text-gray hover:text-gray-300">Teachers</Link>
          <Link to="/about" className="text-gray hover:text-gray-300">About</Link>
          <Link to="/gallery" className="text-gray hover:text-gray-300">Gallery</Link>

          <div className="flex space-x-4 ml-auto">
          {isLoggedIn ? (
            <>
              <button onClick={logOutUser} className="text-gray hover:bg-gray-700 px-4 py-2 rounded">
                Logout
              </button>

              <Link to="/profile">
                <button className="text-gray hover:bg-gray-700 px-4 py-2 rounded">Profile</button>
              </Link>

              <span className="text-gray">{user && user.name}</span>
            </>
          ) : (
            <>
              <Link to="/signup">
                <button className="text-gray hover:text-gray-300 ">Sign Up</button>
              </Link>
              <Link to="/login">
                <button className="text-gray hover:text-gray-300 ">Login</button>
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
