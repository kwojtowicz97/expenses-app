import classes from "./CreateUserView.module.css"
import { useContext, useRef } from "react";
import { AuthContext } from "../../store/auth";

const NewAccountView: React.FC = () => {
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const repeatPasswordInput = useRef<HTMLInputElement>(null);
  const authCtx = useContext(AuthContext)
    const clickHandler = (event: React.FormEvent) => {
      event.preventDefault();
      if (passwordInput.current?.value !== repeatPasswordInput.current?.value) {
        console.log("Password does not match");
        return;
      }
        authCtx.createUser(
          emailInput.current!.value,
          passwordInput.current!.value,
          true
        );

    };

    return (
      <div className={classes.container}>
        <p className={classes.header}>New Account</p>
        <form onSubmit={clickHandler} className={classes.form}>
          <div className={classes["input-group"]}>
            <label htmlFor="user">E-Mail</label>
            <input ref={emailInput} id="user" type="text"></input>
          </div>
          <div className={classes["input-group"]}>
            <label htmlFor="password">Password</label>
            <input ref={passwordInput} id="password" type="password"></input>
          </div>
          <div className={classes["input-group"]}>
            <label htmlFor="password">Confirm Password</label>
            <input ref={repeatPasswordInput} id="rep-password" type="password"></input>
          </div>
          <button className={classes.button}>Create</button>
        </form>
      </div>
    );
}

export default NewAccountView;