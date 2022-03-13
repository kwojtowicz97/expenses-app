import React, { Component, createContext, useState } from "react";

export const AuthContext = React.createContext({
  currentView: "",
  token: "",
  name: "",
  isLoggedIn: false,
  changeCurrentView: (viewName: string) => {},
  login: (user: string, password: string) => {},
});

const AuthProvider: React.FC = (props) => {
  const [currentView, setCurrenView] = useState("LoginView");
  const [token, setToken] = useState("null");
  const [name, setName] = useState("null");
  const [isLoggedIn, setIsLoggedIn] = useState(false)

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
      .then((respose) => respose.json())
      .then((data) => {
        setToken(data.idToken);
        setName(data.email);
        setIsLoggedIn(true)
      });
      
  };

  return (
    <AuthContext.Provider
      value={{ currentView, token, name, isLoggedIn, changeCurrentView, login }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
