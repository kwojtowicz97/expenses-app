import LoginView from "./components/loginView/LoginView";
import { useState, useContext } from "react";
import { AuthContext } from "./store/auth";
import StatusIcon from "./components/UI/StatusIcon";

function App() {
  const [currentView, setCurrentView] = useState("LoginView");
  const authCtx = useContext(AuthContext);

  return (
    <>
      <StatusIcon />
      {currentView === "LoginView" && <LoginView />}
    </>
  );
}

export default App;
