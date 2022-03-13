import LoginView from "./components/loginView/LoginView";
import { useContext } from "react";
import StatusIcon from "./components/UI/StatusIcon";
import Modal from "./components/UI/Modal";
import classes from "./App.module.css"
import NewAccountView from "./components/newAccountView/CreateUserView";
import { AppContext } from "./store/app";

function App() {
  const appCtx = useContext(AppContext)

  return (
    <div className={classes.container}>
      {appCtx.isError && <Modal />}
      <StatusIcon />
      {appCtx.currentView === "LoginView" && <LoginView />}
      {appCtx.currentView === "NewAccountView" && <NewAccountView />}
    </div>
  );
}

export default App;
