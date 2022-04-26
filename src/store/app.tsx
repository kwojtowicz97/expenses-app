import React, { useState, useEffect } from "react";
import { Room, AppContextType } from "../@types/app";
import { Expense } from "../@types/app";

export const AppContext = React.createContext<AppContextType | null>(null);

const AppProvider: React.FC = (props) => { 
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [rooms, setRooms] = useState<string[] | null>([]);
  const [expense, setExpense] = useState<any | null>(null);
  

  const fetchNewRoom = async (roomName: string, owner: string) => {
    const room = {
      name: roomName,
      creationDate: "12-12-2022",
      owner: owner,
      expenses: [],
      users: [],
    };
    try {
      const response = await fetch(
        "https://expensesapp-a0382-default-rtdb.europe-west1.firebasedatabase.app/rooms.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(room),
        }
      );
      if (!response.ok) {
        throw Error(response.statusText);
      }
      await response.json();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRooms = async () => {
    try {
      const response = await fetch(
        "https://expensesapp-a0382-default-rtdb.europe-west1.firebasedatabase.app/rooms.json?shallow=true"
      );
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const items = await response.json();
      setRooms(Object.keys(items));
    } catch (err) {
      console.log(err);
    }
  };



  // const fetchNewExpense = async (expense: Expense) => {
  //   console.log(rooms)
  //   console.log(Object.keys(rooms));
  //   const indexOfRoom = Object.keys(rooms).find(
  //     (key) => rooms[key].name === room.name
  //   );
  //   if (indexOfRoom === undefined) return
  //   console.log(indexOfRoom)
  //   try {
  //     const response = await fetch(
  //       `https://expensesapp-a0382-default-rtdb.europe-west1.firebasedatabase.app/rooms/${indexOfRoom}/expenses.json`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(expense),
  //       }
  //     );
  //     await fetchRooms();
  //     console.log(response)
      
  //     console.log(rooms)
      
  //     if (!response.ok) {
  //       throw Error(response.statusText);
  //     }
  //     const data = await response.json();
      
  //     return data
  //   } catch (err) {
  //     console.log(err);
  //   }
    
  // };

  return (
    <AppContext.Provider
      value={{
        error,
        isError,
        rooms,
        setError,
        setIsError,
        fetchRooms,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
