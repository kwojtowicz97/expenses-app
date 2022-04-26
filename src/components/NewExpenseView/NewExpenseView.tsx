import Header from "../UI/Header";
import classes from "./NewExpenseView.module.css";
import { AuthContext } from "../../store/auth";
import { useContext } from "react";
import { AppContext } from "../../store/app";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { Expense } from "../../@types/app";
import { useNavigate } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import usePostData from "../../hooks/usePostData";
import Avatar from "../UI/Avatar";

const NewExpenseView = () => {
  const navigate = useNavigate();
  const { roomID } = useParams();
  const authCtx = useContext(AuthContext);
  const roomNameRef = useRef<HTMLInputElement>(null);
  const [isUserControlled, setIsUserControlled] = useState(false);
  const [totalAmount, setTotalAmount] = useState<string>("0");
  const [roomUsersData, setRoomUsersData] = useState(null);
  const [fetchedUsers, isUsersLoaded, isUsersError, doFetchUsers] =
    useFetchData(
      `https://expensesapp-a0382-default-rtdb.europe-west1.firebasedatabase.app/rooms/${roomID}/users.json`
    );
  const [
    fetchedUserNames,
    isUsernamesLoaded,
    isUserNamesError,
    doFetchUserNames,
  ] = useFetchData(
    `https://expensesapp-a0382-default-rtdb.europe-west1.firebasedatabase.app/users.json`
  );
  const [expenseID, isExpensePosted, isExpenseError, doPost] = usePostData(
    `https://expensesapp-a0382-default-rtdb.europe-west1.firebasedatabase.app/rooms/${roomID}/expenses.json`,
    "POST"
  );

  useEffect(() => {
    if (!isUsersLoaded || isUsersError) return;
    const usersData = [];
    for (const user of fetchedUsers) {
      usersData.push({ userID: user, value: "0", isActive: true });
    }
    setRoomUsersData(usersData);
  }, [isUsersLoaded]);

  useEffect(() => {
    if (!isUsersLoaded) return;
    setTotalAmount(
      "" +
        roomUsersData
          .map((user) => (user.isActive ? +user.value : 0))
          .reduce((a, b) => a + b)
    );
  }, [roomUsersData]);

  useEffect(() => {
    isExpensePosted && navigate(`/room/${roomID}`);
  }, [isExpensePosted]);

  const fetchNewExpenseHandelr = () => {
    const users = {};
    for (const user of roomUsersData) {
      users[user.userID] = user.value;
    }
    const expense: Expense = {
      amount: totalAmount,
      date: "22-12-2022",
      name: roomNameRef.current.value,
      owner: authCtx.authData.localId,
      users: users,
    };
    doPost(expense);
  };

  const setTotalAmountHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const val = event.currentTarget.value.replace(",", ".");
    const regex = new RegExp("^[0-9]*[.,]?[0-9]{0,2}$");
    event.preventDefault();
    if (!regex.test(event.currentTarget.value)) return;
    setIsUserControlled(false);
    setTotalAmount(event.currentTarget.value);
    setRoomUsersData((prev) => {
      const noOfUsers = prev.filter((user) => user.isActive).length;
      const dividedToatalAmount = "" + +val / noOfUsers;
      return prev.map((user) => {
        return {
          userID: user.userID,
          value: user.isActive ? dividedToatalAmount : "0",
          isActive: user.isActive,
        };
      });
    });
  };

  const setUserValueHandler = (
    e,
    user: { userID: string; value: string; isActive: boolean }
  ) => {
    e.preventDefault();
    const val = e.currentTarget.value.replace(",", ".");
    const regex = new RegExp("^[0-9]*[.,]?[0-9]{0,2}$");
    if (!regex.test(e.currentTarget.value)) return;
    const updatedUser = {
      userID: user.userID,
      value: val,
      isActive: user.isActive,
    };
    setIsUserControlled(true);
    setRoomUsersData((prev) =>
      prev.map((obj) => (obj.userID === user.userID ? updatedUser : obj))
    );
  };

  const activeHandler = (user: {
    userID: string;
    value: string;
    isActive: boolean;
  }) => {
    const updatedUser = {
      userID: user.userID,
      value: user.value,
      isActive: !user.isActive,
    };
    setRoomUsersData((prev) => {
      return prev.map((obj) =>
        obj.userID === user.userID ? updatedUser : obj
      );
    });
    {
      setRoomUsersData((usersData) => {
        const noOfUsers = usersData.filter((user) => user.isActive).length;
        const dividedToatalAmount = "" + +totalAmount / noOfUsers;
        return usersData.map((user) => {
          return !isUserControlled
            ? {
                userID: user.userID,
                value: user.isActive ? dividedToatalAmount : "0",
                isActive: user.isActive,
              }
            : {
                userID: user.userID,
                value: user.isActive ? user.value : "0",
                isActive: user.isActive,
              };
        });
      });
    }
  };

  return (
    <>
      <Header first={{ symbol: "+", onClick: fetchNewExpenseHandelr }}>
        New Expense
      </Header>
      {roomUsersData && isUsernamesLoaded ? (
        <div className={classes.container}>
          {isUsersLoaded && (
            <div className={classes.expense}>
              <div className={classes.top}>
                <div className={classes.ownerMiniature}>
                  <Avatar
                    user={fetchedUserNames[authCtx.authData.localId]}
                    size={80}
                  />
                </div>
                <h1>{`${fetchedUserNames[authCtx.authData.localId].firstName} ${
                  fetchedUserNames[authCtx.authData.localId].lastName
                }`}</h1>
              </div>
              <div className={classes.amountDiv}>
                <input
                  value={roomUsersData
                    .map((user) => +user.value)
                    .reduce((a, b) => a + b)}
                  onChange={setTotalAmountHandler}
                  className={classes.amount}
                  type="text"
                  placeholder="0,00"
                />
                <div>zł</div>
              </div>
              <div className={classes.divider}></div>
              <h1>
                <input ref={roomNameRef} type="text" placeholder="Name" />
              </h1>
              <ul className={classes.list}>
                {roomUsersData.map((user) => (
                  <li>
                    <div className={classes.ownerMiniature}></div>
                    <div className={classes.elementText}>
                      <p className={classes.name}>
                        {`${fetchedUserNames[user.userID].firstName} ${
                          fetchedUserNames[user.userID].lastName
                        }`}
                      </p>
                      <div className={classes.smallAmountDiv}>
                        <input
                          readOnly={!user.isActive}
                          onChange={(e) => setUserValueHandler(e, user)}
                          className={classes.smallAmount}
                          value={user.value}
                          type="text"
                        />
                        <div>zł</div>
                      </div>
                    </div>
                    <div
                      onClick={() => activeHandler(user)}
                      className={`${classes.checkMark} ${
                        user.isActive && classes.active
                      }`}
                    ></div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default NewExpenseView;
