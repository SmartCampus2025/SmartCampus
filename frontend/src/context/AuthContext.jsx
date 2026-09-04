import React, { createContext, useContext, useState } from 'react';
import { getCurrentUser, loginUser, logoutUser } from '../api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getCurrentUser() || { name: 'Super Admin', role: 'SuperAdmin' });

  const logout = () => {
    logoutUser();
    setUser({ name: 'Guest User', role: 'Guest' });
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
