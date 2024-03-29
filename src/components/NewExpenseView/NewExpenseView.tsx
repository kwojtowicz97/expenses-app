import Header from "../UI/Header";
import classes from "./NewExpenseView.module.css";
import { AuthContext } from "../../store/auth";
import { useContext } from "react";
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
      `https://expensesapp-a0382-default-rtdb.europe-west1.firebasedatabase.app/rooms/${roomID}.json`
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
    for (const user of Object.values(fetchedUsers.users)) {
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
  console.log(roomUsersData);
  console.log(fetchedUserNames);

  return isUsersLoaded && isUsernamesLoaded ? (
    <>
      <Header
        code={fetchedUsers.code}
        first={{ symbol: "+", onClick: fetchNewExpenseHandelr }}
      >
        New Expense
      </Header>
      {roomUsersData && isUsernamesLoaded ? (
        <div className={classes.container}>
          {isUsersLoaded && (
            <div className={classes.expense}>
              <div>
                <div className={classes.top}>
                  <div className={classes.ownerMiniature}>
                    <Avatar
                      user={fetchedUserNames[authCtx.authData.localId]}
                      size={80}
                    />
                  </div>
                  <h1>{`${
                    fetchedUserNames[authCtx.authData.localId].firstName
                  } ${
                    fetchedUserNames[authCtx.authData.localId].lastName
                  }`}</h1>
                
              </div>
              <div className={classes.amountDiv}>
                <div className={classes.amountContainer}>
                  <input
                    value={roomUsersData
                      .map((user) => +user.value)
                      .reduce((a, b) => a + b)}
                    onChange={setTotalAmountHandler}
                    className={classes.amount}
                    type="text"
                    placeholder="0,00"
                  />
                </div>
                <div>zł</div>
              </div>
              <div className={classes.divider}></div>
              <h1>
                <input
                  ref={roomNameRef}
                  type="text"
                  placeholder="Expense name"
                  maxLength={20}
                  required
                />
              </h1></div>
              <ul className={classes.list}>
                {roomUsersData.map((user) => (
                  <li key={user.userID}>
                    <div className={classes.userMiniature}>
                      <Avatar user={fetchedUserNames[user.userID]} size={80} />
                    </div>
                    <div className={classes.elementText}>
                      <p className={classes.name}>
                        {`${fetchedUserNames[user.userID].firstName} ${
                          fetchedUserNames[user.userID].lastName
                        }`}
                      </p>
                      <div className={classes.smallAmountDiv}>
                        <input
                          style={{
                            width:
                              parseFloat(user.value).toFixed(2).length + "ch",
                          }}
                          readOnly={!user.isActive}
                          onChange={(e) => setUserValueHandler(e, user)}
                          className={classes.smallAmount}
                          value={parseFloat(user.value).toFixed(2)}
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
  ) : (
    <p>Loading...</p>
  );
};

export default NewExpenseView;
