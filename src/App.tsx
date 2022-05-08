import LoginView from "./components/loginView/LoginView";
import { useContext, useEffect } from "react";
import StatusIcon from "./components/UI/StatusIcon";
import Modal from "./components/UI/modal";
import classes from "./App.module.css";
import NewAccountView from "./components/newAccountView/CreateUserView";
import { AppContext } from "./store/app";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./store/auth";
import RoomSelectView from "./components/roomSelectView/roomSelectView";
import RoomView from "./components/roomView/RoomView";
import ExpenseDetail from "./components/expenseDetailView/expenseDetail";
import NewRoomView from "./components/newRoomView/NewRoomView";
import NewExpenseView from "./components/NewExpenseView/NewExpenseView";


function App() {
  console.log("app")
  const appCtx = useContext(AppContext);
  const authCtx = useContext(AuthContext);


  useEffect(() => authCtx.loginViaLocalStorage(), []);
  

  return (
    <div className={classes.container}>
      <StatusIcon />
      {appCtx.isError && <Modal />}
      <Router>
        <Routes>
          <Route
            path="/detail/:roomID/:id"
            element={
              !authCtx.authData ? <Navigate to="/login" /> : <ExpenseDetail />
            }
          />
          <Route
            path="/"
            element={
              !authCtx.authData ? <Navigate to="/login" /> : <RoomSelectView />
            }
          />
          <Route path="/login" element={<LoginView />} />
          <Route
            path="/:roomID/newexpense"
            element={
              !authCtx.authData ? <Navigate to="/login" /> : <NewExpenseView />
            }
          />
          <Route
            path="/newroom"
            element={
              !authCtx.authData ? <Navigate to="/login" /> : <NewRoomView />
            }
          />
          <Route path="/register" element={<NewAccountView />} />
          <Route
            path="/room/:id"
            element={
              !authCtx.authData ? <Navigate to="/login" /> : <RoomView />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
