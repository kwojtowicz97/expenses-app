import React, { Component, createContext, useState } from "react";

export const AuthContext = React.createContext({
  currentView: "",
  token: "",
  name: "",
  isLoggedIn: false,
  isError: false,
  error: "",
  setError: (error: string) => {},
  changeCurrentView: (viewName: string) => {},
  login: (user: string, password: string) => {},
});

const AuthProvider: React.FC = (props) => {
  const [currentView, setCurrenView] = useState("LoginView");
  const [token, setToken] = useState("null");
  const [name, setName] = useState("null");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState("")

  const changeCurrentView = (viewName: string) => {
    setCurrenView(viewName);
  };


  const login = (user: string, password: string) => {
    const URL =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBHb6MBKoNIMBlB-VG-n6lhJBDVCFVMebw";
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user,
        password: password,
        returnSecureToken: true,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json().then((data) => {
            setToken(data?.idToken);
            setName(data.email);
            setIsLoggedIn(true);
            setIsError(false)
          });
        }
        return response.json().then((data) => {
          const errorMessage = data.error.message;
          throw new Error(errorMessage);
        });
      })
      .catch((error) => {
          setIsError(true)
          setError(error.message)
      });;
  };

  return (
    <AuthContext.Provider
      value={{ currentView, token, name, isLoggedIn, changeCurrentView, login, setError,error,  isError }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
