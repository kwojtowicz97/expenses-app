import LigthButton from "./LightButton";
import classes from "./RoomButtonGroup.module.css";
import { useContext } from "react";
import { AppContext } from "../../store/app";

const RoomButtonGroup: React.FC<{rooms: {room?: {name: string}}}> = (props) => {

  const appCtx = useContext(AppContext)

  return (
    <div className={classes.RoomButtonGroup}>
      {Object.values(props.rooms).map((room: {name: string}, index) => (
        <LigthButton key={index} room={room} />
      ))}
    </div>
  );
};

export default RoomButtonGroup;
