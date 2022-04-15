import React, { useState, useContext } from "react";
import { AppContext } from "./app";
import { AuthContextType } from "../@types/auth";

export const AuthContext = React.createContext<AuthContextType | null>(null);

const AuthProvider: React.FC = (props) => {
  const appCtx = useContext(AppContext);
  const [token, setToken] = useState(null);
  const [name, setName] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const createUser = (user: string, password: string) => {
  //     const URL =
  //       "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBHb6MBKoNIMBlB-VG-n6lhJBDVCFVMebw";
  //     fetch(URL, {
  //       method: "POST",
  //       body: JSON.stringify({
  //         email: user,
  //         password: password,
  //         returnSecureToken: true,
  //       }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       .then((response) => {
  //         // setIsLoading(false);
  //         if (response.ok) {
  //           return response.json();
  //         } else {
  //           return response.json().then((data) => {
  //             const errorMessage = data.error.message;
  //             throw new Error(errorMessage);
  //           });
  //         }
  //       })
  //       .then((data) => {
  //         setToken(data.idToken);
  //         setName(data.email);
  //         setIsLoggedIn(true);
  //         appCtx.setIsError(false);
  //       })
  //       .catch((error) => {
  //         appCtx.setIsError(true);
  //         appCtx.setError(error.message);
  //       });

  // };

  const logout = () => {
    setName(null)
    setToken(null)
    setIsLoggedIn(false)
  }

  const createUser = async (user: string, password: string) => {
    try {
      const URL = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBHb6MBKoNIMBlB-VG-n6lhJBDVCFVMebw";
      const response = await fetch(URL, {
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
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data)
      }
      const data = await response.json()
      setToken(data.idToken);
      setName(data.email);
      setIsLoggedIn(true);
      appCtx.setIsError(false);
    } catch (err) {console.log(err)}
  }

  // const login = (user: string, password: string) => {
  //   const URL =
  //     "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBHb6MBKoNIMBlB-VG-n6lhJBDVCFVMebw";
  //   fetch(URL, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       email: user,
  //       password: password,
  //       returnSecureToken: true,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => {
  //       // setIsLoading(false);
  //       if (response.ok) {
  //         return response.json();
  //       } else {
  //         return response.json().then((data) => {
  //           const errorMessage = data.error.message;
  //           throw new Error(errorMessage);
  //         });
  //       }
  //     })
  //     .then((data) => {
  //       setToken(data.idToken);
  //       setName(data.email);
  //       setIsLoggedIn(true);
  //       appCtx.setIsError(false);
  //       localStorage.setItem(
  //         "user",
  //         JSON.stringify({
  //           token: data.idToken,
  //           name: data.email,
  //           isLoggedIn: true
  //         })
  //       );
  //     })
  //     .catch((error) => {
  //       appCtx.setIsError(true);
  //       appCtx.setError(error.message);
  //     });
  // };

  const login = async (user: string, password: string) => {
    try {
      const URL = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBHb6MBKoNIMBlB-VG-n6lhJBDVCFVMebw";
      const response = await fetch(URL, {
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
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error.message);
      }
      const data = await response.json();
      console.log(data)
      setToken(data.idToken);
      setName(data.email);
      setIsLoggedIn(true);
      appCtx.setIsError(false);
      localStorage.setItem(
        "user",
        JSON.stringify({
          token: data.idToken,
          name: data.email,
          isLoggedIn: true
        })
      );
    } catch (err) {console.log(err)}
  }

  const checkAndLogin = () => {
      const userFromLS = JSON.parse(localStorage.getItem('user') || '{}')
      if (userFromLS.isLoggedIn) {
          setToken(userFromLS.token)
          setName(userFromLS.name)
          setIsLoggedIn(true)
          localStorage.removeItem("user")
      }
  }

  return (
    <AuthContext.Provider value={{ token, name, isLoggedIn, login, logout, createUser, checkAndLogin }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
