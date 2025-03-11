import React, { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import { Navigate } from 'react-router-dom';

const IsPrivate = ({ children }) => {
  const { isLoggedIn, user } = useContext(AuthContext);

  // Si el usuario no está logueado, redirige a la página de login
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // Si el usuario está logueado pero no es admin, redirige a la página de cursos
  if (user && user.role !== 'admin') {
    return <Navigate to="/courses" />;
  }

  // Si el usuario está logueado y tiene rol de admin, permite el acceso a la página
  return children;
};

export default IsPrivate;


