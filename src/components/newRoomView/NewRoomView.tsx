import Header from "../UI/Header";
import classes from "./NewRoomView.module.css";
import DarkButton from "../UI/DarkButton";
import { useEffect, useRef, useContext } from "react";
import InputGroup from "../UI/InputGroup";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../store/auth";
import usePostData from "../../hooks/usePostData";
import useJoinRoom from "../../hooks/useJoinRoom";
import useFetchData from "../../hooks/useFetchData";
import { stringify } from "querystring";
import { useState } from "react";

const postRoomURL =
  "https://expensesapp-a0382-default-rtdb.europe-west1.firebasedatabase.app/rooms.json";

const NewRoomView: React.FC = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const nameRef = useRef<HTMLInputElement>(null);
  const codeRef = useRef<HTMLInputElement>(null);
  const [matchingRoom, setMatchingRoom] = useState(null)
  const [postRoomResponse, isLoaded, isError, doRoomPost] = usePostData(
    postRoomURL,
    "POST"
  );
  const [
    postJoinRoomResponse,
    isJoinLoaded,
    isJoinError,
    doJoinRoomPost,
    setJoinURL,
  ] = useJoinRoom();

  const [roomsResponse, isRoomsLoaded, isRoomsError, doFetch] = useFetchData(`https://expensesapp-a0382-default-rtdb.europe-west1.firebasedatabase.app/rooms.json`);

  const createHandler = async () => {
    const newRoomData = {
      name: nameRef.current.value,
      creationDate: "12-12-2022",
      owner: authCtx.authData.email,
      expenses: [],
      users: [authCtx.authData.localId],
      code: String(Math.random()).substring(2, 8),
    };
    doRoomPost(newRoomData);
  };

  const joinHandler = () => {
    const matchingRoomId: any[] = Object.entries(roomsResponse).find((pair: any) => pair[1].code === codeRef.current.value);
    const joinRoomURL = `https://expensesapp-a0382-default-rtdb.europe-west1.firebasedatabase.app/rooms/${matchingRoomId[0]}/users.json`;
    setMatchingRoom(matchingRoomId[0]);
    setJoinURL(joinRoomURL);
    doJoinRoomPost(authCtx.authData.localId);
  };

  useEffect(() => {
    isLoaded && navigate(`/room/${postRoomResponse.name}`);
    matchingRoom && navigate(`/room/${matchingRoom}`);
  }, [isLoaded, matchingRoom]);

  return (
    isRoomsLoaded ? <>
      <Header code={false}>New Room</Header>
      <div className={classes.wrapper}>
        <InputGroup id="name" label="Name" type="text" pref={nameRef} />
        <DarkButton onClick={createHandler}>Create</DarkButton>
      </div>
      <div className={classes.wrapper}>
        <InputGroup id="code" label="Code" type="string" pref={codeRef} />
        <DarkButton onClick={joinHandler}>Join</DarkButton>
      </div>
    </> : <p>Loading...</p>
  );
};

export default NewRoomView;
