import LoginView from "./components/loginView/LoginView";
import { useContext } from "react";
import StatusIcon from "./components/UI/StatusIcon";
import Modal from "./components/UI/modal";
import classes from "./App.module.css";
import NewAccountView from "./components/newAccountView/CreateUserView";
import { AppContext } from "./store/app";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./store/auth";


function App() {
  const appCtx = useContext(AppContext);
  const authCtx = useContext(AuthContext)
  authCtx.checkAndLogin()


  return (
    <div className={classes.container}>
      <StatusIcon />
      {appCtx.isError && <Modal />}
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              !authCtx.isLoggedIn ? (
                <Navigate to="/login" />
              ) : (
                <Navigate to="/register" />
              )
            }
          />
          <Route path="/login" element={<LoginView />} />
          <Route path="/register" element={<NewAccountView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
