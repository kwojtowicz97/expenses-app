import React from "react"
import Header from "../UI/Header"
import RoomButtonGroup from "../UI/RoomButtonGroup";
import { AppContext } from "../../store/app";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const RoomSelectView: React.FC = () => {

  const appCtx = useContext(AppContext)
      const navigate = useNavigate();
      const addRoomhandler = () => {
        navigate("/newroom");
      };

  

  useEffect(() => appCtx.fetchRooms(), [])

    return (
      <>
        <Header onClick={addRoomhandler}>Select Room</Header>
        <RoomButtonGroup rooms={appCtx.rooms} />
      </>
    );
}

export default RoomSelectView