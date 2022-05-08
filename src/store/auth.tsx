import React, { useState, useContext } from "react";
import { AppContext } from "./app";
import { AuthContextType } from "../@types/auth";
import usePostData from "../hooks/usePostData";

export const AuthContext = React.createContext<AuthContextType | null>(null);

const AuthProvider: React.FC = (props) => {
  const appCtx = useContext(AppContext);
  const [authData, setAuthData] = useState(null);

  const [namesResponse, isNamesPosted, isNamesError, doPost] = usePostData(
    `https://expensesapp-a0382-default-rtdb.europe-west1.firebasedatabase.app/users.json`,
    "PUT"
  );


  const logout = () => {
    localStorage.removeItem("userData");
    setAuthData(null);
  };

  const loginViaLocalStorage = () => {
    if (!localStorage.getItem("userData")) return;
    setAuthData(JSON.parse(localStorage.getItem("userData")));
  };

  const createUser = async (
    user: string,
    password: string,
    b: boolean,
    firstName: any,
    lastName: any,
    usersData: any
  ) => {
    console.log(usersData);
    try {
      const URL =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBHb6MBKoNIMBlB-VG-n6lhJBDVCFVMebw";
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
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data);
      }

      const data = await response.json();
      const payload = { ...usersData };
      payload[data.localId] = { firstName, lastName, avatar: false };
      doPost(payload)

      setAuthData(data);
      localStorage.setItem("userData", JSON.stringify(data));
      appCtx.setIsError(false);
    } catch (err) {
      console.log(err);
    }
  };

  const login = async (user: string, password: string) => {
    try {
      const URL =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBHb6MBKoNIMBlB-VG-n6lhJBDVCFVMebw";
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
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error.message);
      }
      const data = await response.json();
      console.log(data);
      setAuthData(data);
      localStorage.setItem("userData", JSON.stringify(data));
      appCtx.setIsError(false);
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <AuthContext.Provider
      value={{
        authData,
        login,
        logout,
        createUser,
        loginViaLocalStorage,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
