import classes from "./LightButton.module.css";
import { useContext } from "react";
import { AppContext } from "../../store/app";
import { useNavigate } from "react-router-dom";
import { Room } from "../../@types/app";


const LigthButton: React.FC<{
  owner?: boolean;
  onClick?:  React.MouseEventHandler<HTMLButtonElement>;
  room?: Room;
}> = (props) => {

  const appCtx = useContext(AppContext)
  const navigate = useNavigate();

  const clickHandler = () => {
    appCtx.setRoom(props.room)
    navigate("/room")
  }

  return (
    <button
      onClick={clickHandler}
      className={`${classes.button} + ${props.owner && classes.owner}`}
    >
      {props.room.name}
    </button>
  );
};

export default LigthButton;