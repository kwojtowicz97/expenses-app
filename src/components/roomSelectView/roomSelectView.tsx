import React from "react"
import Header from "../UI/Header"
import RoomButtonGroup from "../UI/RoomButtonGroup";
import { AppContext } from "../../store/app";
import { useContext, useEffect } from "react";


const RoomSelectView: React.FC = () => {

  const appCtx = useContext(AppContext)
  

  useEffect(() => appCtx.fetchRooms(), [])

    return (
      <>
        <Header>Select Room</Header>
        <RoomButtonGroup rooms={appCtx.rooms} />
      </>
    );
}

export default RoomSelectView