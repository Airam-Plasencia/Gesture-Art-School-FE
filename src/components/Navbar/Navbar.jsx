import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  

  return (
    <nav className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center mr-2">
          <img src="/img/logo.png" alt="Logo" className="h-40 max-w-sm" />
          <span className="ml-4 text-3xl font-bold">
            <span className="text-blue-500">Gesture</span>{' '}
            <span className="text-orange-500">Art</span>{' '}
            <span className="text-gray-500">School</span>
          </span> 
        </div>

        <div className="flex space-x-6 ml-auto">
          <Link to="/">
            <button className="text-gray hover:text-orange-500">Home</button>
          </Link>
          <Link to="/courses" className="text-gray hover:text-orange-500">Courses</Link>
          <Link to="/teachers" className="text-gray hover:text-orange-500">Teachers</Link>
          <Link to="/about" className="text-gray hover:text-orange-500">About</Link>
          <Link to="/gallery" className="text-gray hover:text-orange-500">Gallery</Link>
 
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
                  <button className="text-gray hover:text-orange-500 ">Sign Up</button>
                </Link>
                <Link to="/login">
                  <button className="text-gray hover:text-orange-500 ">Login</button>
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
