import React from "react";
import Header from "../UI/Header";
import RoomButtonGroup from "../UI/RoomButtonGroup";
import { useNavigate } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";

const fetchRoomsURL = "https://expensesapp-a0382-default-rtdb.europe-west1.firebasedatabase.app/rooms.json?shallow=true"

const RoomSelectView: React.FC = () => {
  const navigate = useNavigate();
  const [response, isLoaded, isError, doFetch] = useFetchData(fetchRoomsURL);

  return (
    <>
      <Header first={{ symbol: "+", onClick: () => navigate("/newroom") }}>
        Select Room
      </Header>
      {isLoaded ? (
        <RoomButtonGroup rooms={Object.keys(response)} />
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default RoomSelectView;
