import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function ProtectedElement({ allowedRoles, element }) {
  const { currentUser, loading } = useAuth(); // Incluye 'loading' aquí
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading) { // Solo realiza acciones si no está cargando
      if (!currentUser) {
        // Si el usuario no está autenticado, redirige al login
        navigate("/LoginPage", { state: { from: location } });
      } else if (!allowedRoles.includes(currentUser.rol)) {
        // Si el usuario no tiene el rol permitido, redirige o muestra una página de error
        console.warn(`Acceso denegado a la ruta: ${location.pathname}`);
        navigate("/unauthorized", { replace: true });
      }
    }
  }, [currentUser, allowedRoles, navigate, location, loading]); // Incluye 'loading' como dependencia

  if (loading || !currentUser || !allowedRoles.includes(currentUser.rol)) {
    return null; // Renderiza null mientras se espera la redirección o la finalización de la carga
  }

  return element; // Renderiza el elemento protegido si el usuario tiene acceso y no está cargando
}
