import { useRouter } from 'next/router';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

// const AuthProvider = ({ children }) => {
//     const router = useRouter();

//     const [isAuthenticated, setIsAuthenticated] = useState(false);

//     return (
//         <AuthContext.Provider
//             value={{
//                 isAuthenticated: isAuthenticated,
//                 setIsAuthenticated: setIsAuthenticated,
//             }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthContext };
