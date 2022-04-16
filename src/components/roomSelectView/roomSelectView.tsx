import React from "react";
import Header from "../UI/Header";
import RoomButtonGroup from "../UI/RoomButtonGroup";
import { AppContext } from "../../store/app";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RoomSelectView: React.FC = () => {
  console.log("roomSelect")
  const [rooms, setRooms] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();



  const addRoomhandler = () => {
    navigate("/newroom");
  };

  useEffect(() => {
      const fetchRooms = async () => {
        try {
          const response = await fetch(
            "https://expensesapp-a0382-default-rtdb.europe-west1.firebasedatabase.app/rooms.json?shallow=true"
          );
          if (!response.ok) {
            throw Error(response.statusText);
          }
          const items = await response.json();
          console.log(items)
          setRooms(Object.keys(items))
          setIsLoaded(true)
        } catch (err) {
          console.log(err);
        }
      };
      fetchRooms()
  }, []);


  return (
    <>
      <Header first={{ symbol: "+", onClick: addRoomhandler }}>
        Select Room
      </Header>
      {isLoaded ? <RoomButtonGroup rooms={rooms} /> : <p>Loading...</p>}
    </>
  );
};

export default RoomSelectView;
