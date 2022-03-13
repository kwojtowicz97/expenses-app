import React from "react"
import Header from "../UI/Header"
import RoomButtonGroup from "../UI/RoomButtonGroup";

const RoomSelectView: React.FC = () => {
    return (
      <>
        <Header>Select Room</Header>
        <RoomButtonGroup/>
      </>
    );
}

export default RoomSelectView