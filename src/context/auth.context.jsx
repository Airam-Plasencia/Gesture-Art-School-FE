import React, { useState, useEffect } from "react";
import authService from "../services/auth.service";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);  // Agregar setUser al contexto

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  const authenticateUser = () => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      authService
        .verify() // Aquí verificamos el token con el backend
        .then((response) => {
          const user = response.data;
          setIsLoggedIn(true);
          setIsLoading(false);
          setUser(user);  // Actualiza el usuario
        })
        .catch((error) => {
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser(null);  // Si el token es inválido o no existe, limpiamos el usuario
        });
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);  // Si no hay token, también limpiamos el usuario
    }
  };

  const logOutUser = () => {
    localStorage.removeItem("authToken");  // Elimina el token de localStorage
    setIsLoggedIn(false);  // Resetea el estado de autenticación
    setUser(null);  // Limpia el usuario
  };

  useEffect(() => {
    authenticateUser();  // Llama a authenticateUser al montar el componente
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        setUser,  // Asegúrate de incluir setUser en el contexto
        storeToken,
        authenticateUser,
        logOutUser,  // Proveer la función logOutUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };






