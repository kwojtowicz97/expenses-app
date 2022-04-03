import Header from "../UI/Header";
import classes from "./NewExpenseView.module.css";
import { AuthContext } from "../../store/auth";
import { useContext } from "react";
import { AppContext } from "../../store/app";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

const NewExpenseView = () => {
  const authCtx = useContext(AuthContext);
  const appCtx = useContext(AppContext);
  const roomNameRef = useRef<HTMLInputElement>(null)
  const [isUserControlled, setIsUserControlled] = useState(false);
  const [totalAmount, setTotalAmount] = useState<string>("0");
  const [usersData, setUsersData] = useState(
    appCtx.room.users.map((user) => {
      return { name: user, value: "0", isActive: true };
    })
  );
  console.log("is userControl:", isUserControlled)
  useEffect(() => {
    console.log(usersData);
    setTotalAmount(
      "" +
        usersData
          .map((user) => (user.isActive ? +user.value : 0))
          .reduce((a, b) => a + b)
    );
    console.log("userData changed");
  }, usersData);

  const setTotalAmountHandler = (event: React.FormEvent<HTMLInputElement>) => {
    console.log("set total event");
    const val = event.currentTarget.value.replace(",", ".");
    const regex = new RegExp("^[0-9]*[.,]?[0-9]{0,2}$");
    event.preventDefault();
    if (!regex.test(event.currentTarget.value)) return;
    setIsUserControlled(false);
    setTotalAmount(event.currentTarget.value);
    setUsersData((prev) => {
      const noOfUsers = prev.filter((user) => user.isActive).length;
      const dividedToatalAmount = "" + +val / noOfUsers;
      return prev.map((user) => {
        return {
          name: user.name,
          value: user.isActive ? dividedToatalAmount : "0",
          isActive: user.isActive,
        };
      });
    });
  };

  const setUserValueHandler = (
    e,
    user: { name: string; value: string; isActive: boolean }
  ) => {
    console.log("set user event");
    e.preventDefault();
    const val = e.currentTarget.value.replace(",", ".");
    const regex = new RegExp("^[0-9]*[.,]?[0-9]{0,2}$");
    if (!regex.test(e.currentTarget.value)) return;
    const updatedUser = {
      name: user.name,
      value: val,
      isActive: user.isActive,
    };
    setIsUserControlled(true);
    setUsersData((prev) =>
      prev.map((obj) => (obj.name === user.name ? updatedUser : obj))
    );
  };

  const activeHandler = (user: {
    name: string;
    value: string;
    isActive: boolean;
  }) => {
    console.log("set active event");
    const updatedUser = {
      name: user.name,
      value: user.value,
      isActive: !user.isActive,
    };
    setUsersData((prev) => {
      return prev.map((obj) => (obj.name === user.name ? updatedUser : obj));
    });
     {
      setUsersData((usersData) => {
        const noOfUsers = usersData.filter((user) => user.isActive).length;
        const dividedToatalAmount = "" + +totalAmount / noOfUsers;
        return usersData.map((user) => {
          return !isUserControlled
            ? {
                name: user.name,
                value: user.isActive ? dividedToatalAmount : "0",
                isActive: user.isActive,
              }
            : {
                name: user.name,
                value: user.isActive ? user.value : "0",
                isActive: user.isActive,
              };
        });
      });
    }
  };

  return (
    <>
      <Header>New Expense</Header>
      <div className={classes.container}>
        <div className={classes.expense}>
          <div className={classes.top}>
            <div className={classes.ownerMiniature}></div>
            <h1>{authCtx.name}</h1>
          </div>
          <div className={classes.amountDiv}>
            <input
              value={usersData
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
            {usersData.map((user) => (
              <li>
                <div className={classes.ownerMiniature}></div>
                <div className={classes.elementText}>
                  <p className={classes.name}>{user.name}</p>
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
      </div>
    </>
  );
};

export default NewExpenseView;
