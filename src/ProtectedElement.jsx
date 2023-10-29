import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function ProtectedElement({ allowedRoles, element }) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  console.log('CurrentUser en ProtectedElement:', currentUser);

  if (!currentUser) {
    // Si el usuario no está autenticado, redirige al login
    navigate("/LoginPage", { state: { from: location } });
    return null;
  }

  if (!allowedRoles.includes(currentUser.rol)) {
    console.warn(`Acceso denegado a la ruta: ${location.pathname}`);
    return null; // redirigir a una página "No Autorizado" 
  }

  return element;
}
