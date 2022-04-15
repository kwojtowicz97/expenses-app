import Header from "../UI/Header";
import classes from "./NewRoomView.module.css";
import { useState } from "react";
import { useRef } from "react";
import DarkButton from "../UI/DarkButton";
import InputGroup from "../UI/InputGroup";
import { useContext } from "react";
import { AppContext } from "../../store/app";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../store/auth";

const NewRoomView: React.FC = () => {
    const navigate = useNavigate()
  const appCtx = useContext(AppContext);
  const authCtx = useContext(AuthContext)
  const nameRef = useRef<HTMLInputElement>(null);
  const codeRef = useRef<HTMLInputElement>(null);

  const createHandler = async () => {
    const room = await appCtx.fetchNewRoom(nameRef.current.value, authCtx.name)
    navigate("/room")
  };
  return (
    <>
      <Header>New Room</Header>
      <div className={classes.wrapper}>
        <InputGroup id="name" label="Name" type="text" pref={nameRef} />
        <DarkButton onClick={createHandler}>Create</DarkButton>
      </div>
      <div className={classes.wrapper}>
        <InputGroup id="code" label="Code" type="number" pref={codeRef} />
        <DarkButton>Join</DarkButton>
      </div>
    </>
  );
};

export default NewRoomView;
