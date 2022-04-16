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

const NewExpenseView = () => {
  const navigate = useNavigate();
  const { roomID } = useParams();
  const authCtx = useContext(AuthContext);
  const roomNameRef = useRef<HTMLInputElement>(null);
  const [isUserControlled, setIsUserControlled] = useState(false);
  const [totalAmount, setTotalAmount] = useState<string>("0");
  const [isLoaded, setIsLoaded] = useState(false);
  const [roomUsersData, setRoomUsersData] = useState(null);

  useEffect(() => {
    const fetchRoomUsers = async (roomID) => {
      try {
        const response = await fetch(
          `https://expensesapp-a0382-default-rtdb.europe-west1.firebasedatabase.app/rooms/${roomID}/users.json`
        );
        if (!response.ok) {
          throw Error(response.statusText);
        }
        const fetchedRoomUsers = await response.json();
        console.log(fetchedRoomUsers);
        const usersData = []
        for (const user of fetchedRoomUsers) {
          usersData.push({userID: user, value: "0", isActive: true})
        }
        setRoomUsersData(usersData);
        setIsLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRoomUsers(roomID);
  }, []);

  useEffect(() => {
    if (!isLoaded) return 
    setTotalAmount(
      "" +
        roomUsersData
          .map((user) => (user.isActive ? +user.value : 0))
          .reduce((a, b) => a + b)
    );
  }, roomUsersData);

  const fetchNewExpenseHandelr = async () => {

      const fetchNewExpense = async (expense: Expense) => {
        try {
          const response = await fetch(
            `https://expensesapp-a0382-default-rtdb.europe-west1.firebasedatabase.app/rooms/${roomID}/expenses.json`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(expense),
            }
          );
          if (!response.ok) {
            throw Error(response.statusText);
          }
          const data = await response.json();

          return data;
        } catch (err) {
          console.log(err);
        }
      };


    
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
    await fetchNewExpense(expense);
    navigate(`/room/${roomID}`);
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
      return prev.map((obj) => (obj.userID === user.userID ? updatedUser : obj));
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
      <div className={classes.container}>
        {isLoaded && <div className={classes.expense}>
          <div className={classes.top}>
            <div className={classes.ownerMiniature}></div>
            <h1>{authCtx.authData.email}</h1>
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
                  <p className={classes.name}>{user.userID}</p>
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
        </div>}
      </div>
    </>
  );
};

export default NewExpenseView;
