import React, { useState, useContext } from "react";
import { AppContext } from "./app";

export const AuthContext = React.createContext({
  token: "",
  name: "",
  isLoggedIn: false,
  login: (user: string, password: string) => {},
  createUser: (user: string, password: string, bool: boolean) => {},
  checkAndLogin: () => {}
});

const AuthProvider: React.FC = (props) => {
  const appCtx = useContext(AppContext);
  const [token, setToken] = useState("null");
  const [name, setName] = useState("null");
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
      const data = await response.json()
      setToken(data.idToken);
      setName(data.email);
      setIsLoggedIn(true);
      appCtx.setIsError(false);
    } catch (err) {}
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
      const data = response.json()
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
    } catch (err) {}
  }

  const checkAndLogin = () => {
      const userFromLS = JSON.parse(localStorage.getItem('user') || '{}')
      if (userFromLS.isLoggedIn) {
          setToken(userFromLS.token)
          setName(userFromLS.name)
          setIsLoggedIn(true)
      }
  }

  return (
    <AuthContext.Provider value={{ token, name, isLoggedIn, login, createUser, checkAndLogin }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
