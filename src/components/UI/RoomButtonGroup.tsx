import LigthButton from "./LightButton";
import classes from "./RoomButtonGroup.module.css";
import { useContext } from "react";
import { AppContext } from "../../store/app";
import { Room } from "../../@types/app";

const RoomButtonGroup: React.FC<{rooms: string[]}> = (props) => {

  return (
    <div className={classes.RoomButtonGroup}>
      {props.rooms.map((roomID) => (
        <LigthButton roomID={roomID} key={roomID}/>
      ))}
    </div>
  );
};

export default RoomButtonGroup;
