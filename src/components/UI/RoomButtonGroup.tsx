import LigthButton from "./LightButton";
import classes from "./RoomButtonGroup.module.css";
import { useContext } from "react";
import { AppContext } from "../../store/app";
import { Room } from "../../@types/app";

const RoomButtonGroup: React.FC<{rooms: Room[]}> = (props) => {

  const appCtx = useContext(AppContext)

  return (
    <div className={classes.RoomButtonGroup}>
      {Object.values(props.rooms).map((room: Room, index) => (
        <LigthButton key={index} room={room} />
      ))}
    </div>
  );
};

export default RoomButtonGroup;
