import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [token, setToken] = useState(localStorage.getItem("token"));

    useEffect(() => {

        if (token) {

            const savedUser = JSON.parse(localStorage.getItem("user"));

            if (savedUser) {

                setUser(savedUser);

            }

        }

    }, [token]);

    const login = (userData, jwtToken) => {

        localStorage.setItem("token", jwtToken);

        localStorage.setItem("user", JSON.stringify(userData));

        setToken(jwtToken);

        setUser(userData);

    };

    const logout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        setUser(null);

        setToken(null);

    };

    return (

        <AuthContext.Provider

            value={{

                user,

                token,

                login,

                logout

            }}

        >

            {children}

        </AuthContext.Provider>

    );

};

export const useAuth = () => useContext(AuthContext);