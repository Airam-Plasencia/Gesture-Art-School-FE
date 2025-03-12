import React, { useState, useEffect, useContext } from "react";
import authService from "../services/auth.service";
import { Navigate } from "react-router-dom"; // Necesario para redirigir

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);  // Guardamos al usuario en el contexto

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  const authenticateUser = () => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      authService
        .verify() // Verificamos el token con el backend
        .then((response) => {
          const user = response.data;
          setIsLoggedIn(true);
          setIsLoading(false);
          setUser(user);  // Actualizamos el usuario en el estado
        })
        .catch((error) => {
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser(null);  // Si el token es inválido o no existe, limpiamos el usuario
        });
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);  // Si no hay token, limpiamos el usuario
    }
  };

  const logOutUser = () => {
    localStorage.removeItem("authToken");  // Eliminamos el token de localStorage
    setIsLoggedIn(false);  // Reseteamos el estado de autenticación
    setUser(null);  // Limpiamos el usuario
  };

  useEffect(() => {
    authenticateUser();  // Llamamos a authenticateUser al montar el componente
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        setUser,  // Aseguramos que setUser esté disponible
        storeToken,
        authenticateUser,
        logOutUser,  // Proveemos la función logOutUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

// Modificamos la lógica en IsPrivate para redirigir a /profile
function IsPrivate({ children }) {
  const { isLoggedIn, user } = useContext(AuthContext);

  if (!isLoggedIn) {
    // Si no está autenticado, redirige a la página de login
    return <Navigate to="/login" />;
  }

  if (isLoggedIn && user && user.role !== 'admin') {
    // Si el usuario no es administrador y está autenticado, redirigimos al perfil del usuario
    return <Navigate to="/profile" />;
  }

  return children;  // Si está autenticado y tiene rol de admin, muestra los componentes hijos
}

export { AuthProviderWrapper, AuthContext, IsPrivate };










