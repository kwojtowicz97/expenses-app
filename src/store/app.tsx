import React, { useState, useEffect } from "react";


export const AppContext = React.createContext({
  isError: false,
  error: "",
  rooms: {},
  room: {name: ""},
  setError: (error: string) => {},
  setIsError: (bool: boolean) => {},
  fetchRooms: () => {},
  setRoom: (room: {name:string}) => {}
});

const AppProvider: React.FC = (props) => {
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState("")
  const [rooms, setRooms] = useState({});
  const [room, setRoom] = useState({name: ""})

    useEffect(() => console.log(room), [room])


  const fetchRooms = () => {
    fetch(
      "https://expensesapp-a0382-default-rtdb.europe-west1.firebasedatabase.app/rooms.json"
    ).then(response => {
      if (response.ok) {
        return response.json()
      }
      return Promise.reject(response)
  }).then(items => {
    setRooms(items)
  })}

  return (
    <AppContext.Provider
      value={{error,  isError, rooms, room, setError, setIsError, fetchRooms, setRoom }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
