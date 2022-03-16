import React, { useState, useEffect } from "react";
import { Room, AppContextType } from "../@types/room";


export const AppContext = React.createContext<AppContextType | null>(null);

const AppProvider: React.FC = (props) => {
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState(null)
  const [rooms, setRooms] = useState<Room[] | null>([]);
  const [room, setRoom] = useState<Room | null>(null)

    useEffect(() => console.log(room), [room])


  // const fetchRooms = () => {
  //   fetch(
  //     "https://expensesapp-a0382-default-rtdb.europe-west1.firebasedatabase.app/rooms.json"
  //   ).then(response => {
  //     if (response.ok) {
  //       return response.json()
  //     }
  //     return Promise.reject(response)
  // }).then(items => {
  //   setRooms(Object.values(items))
  // })}

 const fetchRooms = async () => {
   try {
    const response = await fetch("https://expensesapp-a0382-default-rtdb.europe-west1.firebasedatabase.app/rooms.json")
    const items = await Object.values(response.json())
    setRooms(items)
   } catch {}
 }

  return (
    <AppContext.Provider
      value={{error,  isError, rooms, room, setError, setIsError, fetchRooms, setRoom }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
