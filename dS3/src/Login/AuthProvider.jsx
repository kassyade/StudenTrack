import React, { createContext, useContext, useState } from 'react';
import UseStorageState from '../servicios/UseStorageState';


// Es el contexto con el que trabaja la aplicación
const AuthContext = createContext();


//PODEMOS TOMAR LOGIN USER LOGOUT
/**
 *     const{user}=useAuth()
 *    const{login}=useAuth()
 *    const{logout}=useAuth()
 * 
 */

export const AuthProvider = ({ children }) => {
  // const [user, setUser] = useState(null);
  // Con esto el usuario toma el valor almacenado, si se está iniciando sesión estará vacío
  const [user, setUser] = UseStorageState("usuario", null);

  const login = (userData) => {
    setUser(userData)
    // con localstorage almacenamos localmente el user y se queda almacenado
    localStorage.setItem("usuario", JSON.stringify(userData))
  };
  
  const logout = () => {
    setUser(null)
    // borramos el localstorage de user
    localStorage.removeItem("usuario")
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
