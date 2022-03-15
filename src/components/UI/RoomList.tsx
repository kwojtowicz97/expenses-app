import { useContext } from "react";
import { AppContext } from "../../store/app";
import RoomSummary from "./RoomSummary";
import classes from "./RoomList.module.css"

const RoomList: React.FC = () => {
  const appCtx = useContext(AppContext);
  return (
    <div className={classes.roomList}>
      <RoomSummary />
      <RoomSummary />
      <RoomSummary />
    </div>
  );
};
export default RoomList;
