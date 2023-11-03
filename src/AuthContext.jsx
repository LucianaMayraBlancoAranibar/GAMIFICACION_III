import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext({
  currentUser: null,
  setCurrentUser: () => {},
  hasRole: () => {}
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const hasRole = (role) => {
    return currentUser?.rol === role;
  };

  const value = {
    currentUser,
    setCurrentUser,
    hasRole
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
