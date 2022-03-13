import React, { useState, useContext } from "react";
import { AppContext } from "./app";

export const AuthContext = React.createContext({
  token: "",
  name: "",
  isLoggedIn: false,
  login: (user: string, password: string) => {},
});

const AuthProvider: React.FC = (props) => {
  const appCtx = useContext(AppContext);
  const [token, setToken] = useState("null");
  const [name, setName] = useState("null");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (user: string, password: string) => {
    const URL =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBHb6MBKoNIMBlB-VG-n6lhJBDVCFVMebw";
    fetch(URL, {
      method: "POST",
      body: JSON.stringify({
        email: user,
        password: password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        // setIsLoading(false);
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => {
            const errorMessage = data.error.message;
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        setToken(data.idToken);
        setName(data.email);
        setIsLoggedIn(true);
        appCtx.setIsError(false);
      })
      .catch((error) => {
        appCtx.setIsError(true);
        appCtx.setError(error.message);
      });
  };

  return (
    <AuthContext.Provider value={{ token, name, isLoggedIn, login }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
