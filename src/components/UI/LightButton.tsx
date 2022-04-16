import classes from "./LightButton.module.css";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



const LigthButton: React.FC<{
  owner?: boolean;
  onClick?:  React.MouseEventHandler<HTMLButtonElement>;
  roomID?: string;
}> = (props) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [roomName, setRoomName] = useState(null);

  const navigate = useNavigate();

    useEffect(() => {
      const fetchRoomName = async (roomID) => {
        try {
          const response = await fetch(
            `https://expensesapp-a0382-default-rtdb.europe-west1.firebasedatabase.app/rooms/${roomID}/name.json`
          );
          if (!response.ok) {
            throw Error(response.statusText);
          }
          const fetchedRoomName = await response.json();
          setRoomName(fetchedRoomName);
          setIsLoaded(true);
        } catch (err) {
          console.log(err);
        }
      };
      fetchRoomName(props.roomID);
    }, []);

  const clickHandler = () => {
    navigate(`/room/${props.roomID}`)
  }

  return (
    <button
      onClick={clickHandler}
      className={`${classes.button} + ${props.owner && classes.owner}`}
    >
      {isLoaded ?  roomName  : <p>Loading...</p>}
    </button>
  );
};

export default LigthButton;
