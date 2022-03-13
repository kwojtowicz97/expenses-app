import classes from "./CreateUserView.module.css"
import { useContext, useRef } from "react";
import { AuthContext } from "../../store/auth";
import DarkButton from "../UI/DarkButton";
import Header from "../UI/Header";
import InputGroup from "../UI/InputGroup";

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
        <Header>New Account</Header>
        <form onSubmit={clickHandler} className={classes.form}>
          <InputGroup id="user" label="E-Mail" pref={emailInput} type="text" />
          <InputGroup
            id="password"
            label="Password"
            pref={passwordInput}
            type="password"
          />
          <InputGroup
            id="rep-password"
            label="Confirm Password"
            pref={repeatPasswordInput}
            type="password"
          />
          <DarkButton>Create</DarkButton>
        </form>
      </div>
    );
}

export default NewAccountView;