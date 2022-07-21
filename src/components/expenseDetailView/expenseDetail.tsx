import classes from "./expenseDetail.module.css";
import { useState } from "react";
import Header from "../UI/Header";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Avatar from "../UI/Avatar";
import useFetchData from "../../hooks/useFetchData";
import { AuthContext } from "../../store/auth";
import { useContext } from "react";

const ExpenseDetail: React.FC = (props) => {
  const { id, roomID } = useParams();
  const [isLoaded, setIsLoaded] = useState(false)

  const [roomData, isRoomDataLoaded, isRoomDataError, doFetch] = useFetchData(
    `https://expensesapp-a0382-default-rtdb.europe-west1.firebasedatabase.app/rooms/${roomID}.json`
  );

  const [usersData, isUsernamesLoaded, isUserNamesError, doFetchUserNames] =
    useFetchData(
      `https://expensesapp-a0382-default-rtdb.europe-west1.firebasedatabase.app/users.json`
    );

  useEffect(
    () => setIsLoaded(isRoomDataLoaded && isUsernamesLoaded),
    [isRoomDataLoaded, isUsernamesLoaded]
  );


  return isLoaded ? (
    <>
      <Header code={roomData.code}>{roomData.name}</Header>
      <div className={classes.container}>
        <div className={classes.expense}>
          <div className={classes.top}>
            <div className={classes.ownerMiniature}>
              <Avatar user={usersData[roomData.expenses[id].owner]} size={80} />
            </div>
            <h1>{`${usersData[roomData.expenses[id].owner].firstName} ${
              usersData[roomData.expenses[id].owner].lastName
            }`}</h1>
          </div>
          <div className={classes.amount}>
            <p>{roomData.expenses[id].amount}zł</p>
          </div>
          <div className={classes.divider}></div>
          <h1>{roomData.expenses[id].name}</h1>
          <ul className={classes.list}>
            {Object.keys(roomData.expenses[id].users).map((user) => (
              <li key={user}>
                <div className={classes.userMiniature}>
                  <Avatar user={usersData[user]} size={80} />
                </div>
                <div className={classes.elementText}>
                  <p
                    className={classes.name}
                  >{`${usersData[user].firstName} ${usersData[user].lastName}`}</p>
                  <p className={classes.smallAmount}>
                    {parseFloat(roomData.expenses[id].users[user]).toFixed(2)}zł
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  ) : (
    <p>Loading...</p>
  );
};

export default ExpenseDetail;
