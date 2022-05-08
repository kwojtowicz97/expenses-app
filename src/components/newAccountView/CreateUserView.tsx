import classes from "./CreateUserView.module.css";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../store/auth";
import DarkButton from "../UI/DarkButton";
import Header from "../UI/Header";
import InputGroup from "../UI/InputGroup";
import useFetchData from "../../hooks/useFetchData";
import { Navigate } from "react-router-dom";

const NewAccountView: React.FC = () => {
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const repeatPasswordInput = useRef<HTMLInputElement>(null);
  const firstNameInput = useRef<HTMLInputElement>(null);
  const lastNameInput = useRef<HTMLInputElement>(null);
  const authCtx = useContext(AuthContext);
  const [usersData, isUsernamesLoaded, isUserNamesError, doFetchUserNames] =
    useFetchData(
      `https://expensesapp-a0382-default-rtdb.europe-west1.firebasedatabase.app/users.json`
    );
  const clickHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (passwordInput.current?.value !== repeatPasswordInput.current?.value) {
      console.log("Password does not match");
      return;
    }

    authCtx.createUser(
      emailInput.current!.value,
      passwordInput.current!.value,
      true,
      firstNameInput.current!.value,
      lastNameInput.current!.value,
      usersData
    );
  };

  return isUsernamesLoaded ? (
    <>
      {authCtx.authData && <Navigate to={"/"} />}
      <Header code={false}>New Account</Header>
      <form onSubmit={clickHandler} id="from" className={classes.form}>
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
        <InputGroup
          id="firstName"
          label="First Name"
          pref={firstNameInput}
          type="text"
        />
        <InputGroup
          id="lastName"
          label="Last Name"
          pref={lastNameInput}
          type="text"
        />

        <DarkButton>Create</DarkButton>
      </form>
    </>
  ) : (
    <p>Loading...</p>
  );
};

export default NewAccountView;
