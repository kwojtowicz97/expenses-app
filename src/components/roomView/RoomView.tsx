import Header from "../UI/Header";
import { useState } from "react";
import { useEffect } from "react";
import ExpensesList from "./ExpensesList";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const RoomView: React.FC = () => {
  const { id } = useParams();
  console.log("roomView");
  const [isLoaded, setIsLoaded] = useState(false);
  const [roomData, setRoomData] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
      const fetchRoom = async (roomID) => {
        try {
          const response = await fetch(
            `https://expensesapp-a0382-default-rtdb.europe-west1.firebasedatabase.app/rooms/${roomID}.json`
          );
          if (!response.ok) {
            throw Error(response.statusText);
          }
          const fetchedRoomData = await response.json();
          setRoomData(fetchedRoomData);
          setIsLoaded(true);
        } catch (err) {
          console.log(err);
        }
      };
    fetchRoom(id);
  }, []);



  const addExpenseHandler = () => {
    navigate(`/${id}/newexpense`);
  };
  return (
    <>
      <Header first={{ symbol: "+", onClick: addExpenseHandler }}>
        {isLoaded ? roomData.name : "Loading..."}
      </Header>
      {isLoaded ? (
        <ExpensesList roomData={roomData} roomID={id} />
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default RoomView;
