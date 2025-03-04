import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className=" p-4">
    <div className="flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center">
        <img src="/img/logo.png" alt="Logo" className="h-96 max-w-sm mr-4" />
      </div>

      {/* Links */}
      <div className="flex space-x-6">
        <Link to="/" className="text-gray hover:text-gray-300">Cursos</Link>
        <Link to="/professores" className="text-gray hover:text-gray-300">Profesores</Link>
        <Link to="/about" className="text-gray hover:text-gray-300">About</Link>
        <Link to="/galeria" className="text-gray hover:text-gray-300">Galería</Link>
      </div>
      <Link to="/">
        <button>Home</button>
      </Link>

      {isLoggedIn && (
        <>
          <button onClick={logOutUser}>Logout</button>

          <Link to="/profile">
            <button>Profile</button>
            {/* <img src="https://picsum.photos/id/402/200/300" style={{ width: 50, height: 50, borderRadius: 25}} alt="profile" /> */}
          </Link>

          <span>{user && user.name}</span>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup">
            {" "}
            <button>Sign Up</button>{" "}
          </Link>
          <Link to="/login">
            {" "}
            <button>Login</button>{" "}
          </Link>
        </>
      )}
       </div>
    </nav>
  );
}

export default Navbar;
