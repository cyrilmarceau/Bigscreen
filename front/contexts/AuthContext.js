import { useRouter } from "next/router";
import { createContext, useCallback, useContext, useEffect, useState } from "react";


const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const router = useRouter();

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const changeAuthenticationState = async (state) => {
        setIsAuthenticated(state);
    };



    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: isAuthenticated,
                setIsAuthenticated: setIsAuthenticated,
                changeAuthenticationState: changeAuthenticationState,
            }}
        >
         {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth };