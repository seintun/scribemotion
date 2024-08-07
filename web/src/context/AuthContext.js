import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

/**
 * AuthProvider component that provides authentication functionality to its children.
 * Ref: https://dev.to/miracool/how-to-manage-user-authentication-with-react-js-3ic5
 */
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);