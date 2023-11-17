import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext({
  currentUser: null,
  setCurrentUser: () => {},
  loading: true
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserDetails = async (token) => {
    try {
      const response = await fetch('https://localhost:7205/api/Usuarios/api/users/user-details', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('No se pudo recuperar la información del usuario');
      }

      const userData = await response.json();
      return userData;
    } catch (error) {
      console.error('Error al recuperar los detalles del usuario:', error);
      return null;
    }
  };


  useEffect(() => {
    const initAuth = async () => {
      const storedToken = Cookies.get('token');
      if (storedToken) {
        const userDetails = await fetchUserDetails(storedToken);
        if (userDetails) {
          setCurrentUser(userDetails);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  if (loading) {
    return <div>Cargando...</div>; 
  }

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
  
};

export default AuthProvider;
