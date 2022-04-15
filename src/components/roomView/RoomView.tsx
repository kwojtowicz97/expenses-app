import Header from "../UI/Header";
import { useContext } from "react";
import { AppContext } from "../../store/app";
import RoomList from "./ExpensesList";
import { useNavigate } from "react-router-dom";


const RoomView: React.FC = (props) => {
  const appCtx = useContext(AppContext);
    const updateRoom = async () => {
      await appCtx.fetchRooms();
      const room = Object.values(appCtx.rooms).find(
        (newRoom) => newRoom.name === appCtx.room.name
      );
      appCtx.setRoom(room);
    };

    updateRoom();
  const navigate = useNavigate();
  const addExpenseHandler = () => {
    navigate("/newexpense");
  };
  return (
    <>
      <Header first={{ symbol: "+", onClick: addExpenseHandler }}>
        {appCtx.room.name}
      </Header>
      <RoomList />
    </>
  );
};

export default RoomView;
