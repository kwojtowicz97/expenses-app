import React, { useState, useContext } from "react";
import { AppContext } from "./app";
import { AuthContextType } from "../@types/auth";
import usePostData from "../hooks/usePostData";
import { useEffect } from "react";

export const AuthContext = React.createContext<AuthContextType | null>(null);

const AuthProvider: React.FC = (props) => {
  const [authData, setAuthData] = useState(null);


  const logout = () => {
    setAuthData(null);
  };

  const [
    createUserResponse,
    isCreateUserPosted,
    isCreateUserError,
    doPostCreateUser,
  ] = usePostData(
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBHb6MBKoNIMBlB-VG-n6lhJBDVCFVMebw",
    "POST"
  );

  useEffect(() => {
    isCreateUserPosted && setAuthData(createUserResponse);
  }, [isCreateUserPosted, createUserResponse]);

  const createUser = (user, password) => {
    const payload = {
      email: user,
      password: password,
      returnSecureToken: true,
    };
    doPostCreateUser(payload)
  };

  // const createUser = async (user: string, password: string) => {
  //   try {
  //     const URL =
  //       "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBHb6MBKoNIMBlB-VG-n6lhJBDVCFVMebw";
  //     const response = await fetch(URL, {
  //       method: "POST",
  //       body: JSON.stringify({
  //         email: user,
  //         password: password,
  //         returnSecureToken: true,
  //       }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     if (!response.ok) {
  //       const data = await response.json();
  //       throw new Error(data);
  //     }
  //     const data = await response.json();
  //     setAuthData(data);
  //     appCtx.setIsError(false);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

    const [
      loginUserResponse,
      isLoginUserPosted,
      isLoginUserError,
      doPostLoginUser,
    ] = usePostData(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBHb6MBKoNIMBlB-VG-n6lhJBDVCFVMebw",
      "POST"
    );

    useEffect(() => {
      isLoginUserPosted && setAuthData(loginUserResponse);
    }, [isLoginUserPosted, loginUserResponse]);

    const login = (user, password) => {
      const payload = {
        email: user,
        password: password,
        returnSecureToken: true,
      };
      doPostCreateUser(payload);
    };

  // const login = async (user: string, password: string) => {
  //   try {
  //     const URL =
  //       "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBHb6MBKoNIMBlB-VG-n6lhJBDVCFVMebw";
  //     const response = await fetch(URL, {
  //       method: "POST",
  //       body: JSON.stringify({
  //         email: user,
  //         password: password,
  //         returnSecureToken: true,
  //       }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     if (!response.ok) {
  //       const data = await response.json();
  //       throw new Error(data.error.message);
  //     }
  //     const data = await response.json();
  //     console.log(data);
  //     setAuthData(data);
  //     appCtx.setIsError(false);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <AuthContext.Provider
      value={{ authData, login, logout, createUser }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
