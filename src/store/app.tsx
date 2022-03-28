import React, { useState, useEffect } from "react";
import { Room, Event, AppContextType } from "../@types/app";


export const AppContext = React.createContext<AppContextType | null>(null);

const AppProvider: React.FC = (props) => {
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState(null)
  const [rooms, setRooms] = useState<Room[] | null>([]);
  const [room, setRoom] = useState<Room | null>(null)
  const [expense, setExpense] = useState<Event | null>(null)

    useEffect(() => console.log(room), [room])


 const fetchRooms = async () => {
   try {
    const response = await fetch("https://expensesapp-a0382-default-rtdb.europe-west1.firebasedatabase.app/rooms.json")
     if (!response.ok) {
       throw Error(response.statusText);
     }
    const items = await response.json()
    setRooms(items)
   } catch (err){
     console.log(err)
   }
 }

  return (
    <AppContext.Provider
      value={{error,  isError, rooms, room, expense, setError, setIsError, fetchRooms, setRoom, setExpense }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
