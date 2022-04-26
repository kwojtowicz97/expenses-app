import Header from "../UI/Header";
import classes from "./NewRoomView.module.css";
import { useState } from "react";
import { useRef } from "react";
import DarkButton from "../UI/DarkButton";
import { useEffect } from "react";
import InputGroup from "../UI/InputGroup";
import { useContext } from "react";
import useFetchData from "../../hooks/useFetchData";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../store/auth";
import usePostData from "../../hooks/usePostData";

const postRoomURL =
  "https://expensesapp-a0382-default-rtdb.europe-west1.firebasedatabase.app/rooms.json";

const NewRoomView: React.FC = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const nameRef = useRef<HTMLInputElement>(null);
  const codeRef = useRef<HTMLInputElement>(null);
  const [postRoomResponse, isLoaded, isError, doPost] = usePostData(
    postRoomURL,
    "POST"
  );

  const [
    fetchedUserNames,
    isUsernamesLoaded,
    isUserNamesError,
    doFetchUserNames,
  ] = useFetchData(
    `https://expensesapp-a0382-default-rtdb.europe-west1.firebasedatabase.app/users.json`
  );

  const createHandler = async () => {
    const newRoomData = {
      name: nameRef.current.value,
      creationDate: "12-12-2022",
      owner: authCtx.authData.email,
      expenses: [],
      users: [...Object.keys(fetchedUserNames)],
    };
    doPost(newRoomData);
  };

  useEffect(() => {
    isLoaded && navigate(`/room/${postRoomResponse.name}`);
  }, [isLoaded]);

  return (
    isUsernamesLoaded ? <>
      <Header>New Room</Header>
      <div className={classes.wrapper}>
        <InputGroup id="name" label="Name" type="text" pref={nameRef} />
        <DarkButton onClick={createHandler}>Create</DarkButton>
      </div>
      <div className={classes.wrapper}>
        <InputGroup id="code" label="Code" type="number" pref={codeRef} />
        <DarkButton>Join</DarkButton>
      </div>
    </> : <p>Loading...</p>
  );
};

export default NewRoomView;
