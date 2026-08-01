// import { useState } from 'react';
// import { AuthContext } from './AuthContext';

// export function AuthProvider({ children }) {
//   const [user] = useState(() => {
//     const token = localStorage.getItem('token');
//     if (!token) return null;

//     try {
//       const payload = JSON.parse(atob(token.split('.')[1]));
//       return { email: payload.email, roles: payload.roles };
//     } catch {
//       console.error('Invalid token');
//       return null;
//     }
//   });

//   return (
//     <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
//   );
// }

import { useState } from 'react';
import { AuthContext } from './AuthContext';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        email: payload.email,
        roles: Array.isArray(payload.roles) ? payload.roles : [payload.role],
      };
    } catch {
      return null;
    }
  });

  const loginUser = token => {
    localStorage.setItem('token', token);
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser({
        email: payload.email,
        roles: Array.isArray(payload.roles) ? payload.roles : [payload.role],
      });
    } catch {
      setUser(null);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}
