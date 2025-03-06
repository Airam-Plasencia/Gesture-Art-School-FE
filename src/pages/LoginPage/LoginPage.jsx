import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import { AuthContext } from "../../context/auth.context";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    authService
      .login(requestBody)
      .then((response) => {
       
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/"); 
      })
      .catch((error) => {
        
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center bg-opacity-50" style={{ backgroundImage: "url('https://kevindalyarchitects.com/wp-content/uploads/2020/12/accd-southcampus_01.jpg')" }}>
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-3xl font-bold text-gray-200 bg-transparent hover:text-orange-600 focus:outline-none"
      >
        X
      </button>

      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-gray-800 bg-opacity-75 p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-3xl font-bold text-center text-blue-400 mb-6">Login</h1>

          <form onSubmit={handleLoginSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-white">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmail}
                className="w-full px-4 py-2 mt-2 text-sm border-b-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-white">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePassword}
                className="w-full px-4 py-2 mt-2 text-sm border-b-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                required
              />
            </div>

            <button
              type="submit"
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Login
            </button>
          </form>

          {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}

          <p className="text-center text-white mt-4">Don't have an account? 
            <Link to="/signup" className="text-blue-500 hover:underline"> Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
