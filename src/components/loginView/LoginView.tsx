import classes from "./LoginView.module.css";
import { useContext, useRef } from "react";
import { AuthContext } from "../../store/auth";
import { useNavigate } from "react-router-dom";
import DarkButton from "../UI/DarkButton";
import Header from "../UI/Header";
import InputGroup from "../UI/InputGroup";
import { Navigate } from "react-router-dom";

const LoginView: React.FC = () => {
  console.log("login")
  const userInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate("/register");
  };

  const onLoginSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    authCtx.login(userInput.current!.value, passwordInput.current!.value);
  };

  return (
    <>
        {authCtx.authData && <Navigate to={"/"}/>}
      <Header>Login</Header>
      <form onSubmit={onLoginSubmit} className={classes.form}>
        <InputGroup id="user" label="E-Mail" type="text" pref={userInput} />
        <InputGroup
          id="password"
          label="Password"
          type="password"
          pref={passwordInput}
        />
        <DarkButton>Login</DarkButton>
      </form>
      <DarkButton onClick={clickHandler}>New Account</DarkButton>
    </>
  );
};

export default LoginView;
