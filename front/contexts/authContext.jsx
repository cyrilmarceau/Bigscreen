import { useContext, createContext } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children, isAuthenticated, setIsAuthenticated }) => {
    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
