import React, { useState } from "react";

export const AppContext = React.createContext({
  currentView: "",
  isError: false,
  error: "",
  setError: (error: string) => {},
  setIsError: (bool: boolean) => {},
  changeCurrentView: (viewName: string) => {},
});

const AppProvider: React.FC = (props) => {
  const [currentView, setCurrenView] = useState("LoginView");
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState("s")

  const changeCurrentView = (viewName: string) => {
    setCurrenView(viewName);
  };

  return (
    <AppContext.Provider
      value={{ currentView,error,  isError, changeCurrentView, setError, setIsError }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
