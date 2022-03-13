import classes from "./LoginView.module.css";
import { useContext, useRef } from "react";
import { AuthContext } from "../../store/auth";
import { AppContext } from "../../store/app";

const LoginView: React.FC = () => {
  const userInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const authCtx = useContext(AuthContext);
  const appCtx = useContext(AppContext)

  const clickHandler = () => {
    appCtx.changeCurrentView("NewAccountView");
  };

  
  const onLoginSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    authCtx.login(userInput.current!.value, passwordInput.current!.value);
  };

  return (
    <>
      <p className={classes.header}>Login</p>
      <form onSubmit={onLoginSubmit} className={classes.form}>
        <div className={classes["input-group"]}>
          <label htmlFor="user">E-Mail</label>
          <input ref={userInput} id="user" type="text"></input>
        </div>
        <div className={classes["input-group"]}>
          <label htmlFor="password">Password</label>
          <input ref={passwordInput} id="password" type="password"></input>
        </div>
        <button className={classes.button}>Login</button>
      </form>
      <button onClick={clickHandler} className={classes.button}>
        New Account
      </button>
    </>
  );
};

export default LoginView;
