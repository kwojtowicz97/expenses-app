import Header from "../UI/Header";
import classes from "./NewExpenseView.module.css";
import { AuthContext } from "../../store/auth";
import { useContext } from "react";
import { AppContext } from "../../store/app";
import { useState } from "react";
import { useEffect } from "react";

const NewExpenseView = () => {
  const authCtx = useContext(AuthContext);
  const appCtx = useContext(AppContext);
  const [totalAmount, setTotalAmount] = useState<string>("0");
  const [usersData, setUsersData] = useState(
    appCtx.room.users.map((user) => {
      return { name: user, value: "0", isActive: true };
    })
  );
  useEffect(() => {
    setTotalAmount("" + usersData.map(user => +user.value).reduce((a,b) => a+b))
  }, usersData)

  const setTotalAmountHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const val = event.currentTarget.value.replace(",", ".");
    const regex = new RegExp("^[0-9]*[.,]?[0-9]{0,2}$");
    event.preventDefault();
    if (!regex.test(event.currentTarget.value)) return;
    setTotalAmount(event.currentTarget.value);
    setUsersData((prev) => {
      const noOfUsers = prev.length;
      const dividedToatalAmount = "" + (+val / noOfUsers);
      return prev.map((user) => {
        return { name: user.name, value: dividedToatalAmount, isActive: user.isActive };
      });
    });
  };

  const setUserValueHandler = (e, user) => {
    e.preventDefault();
    const val = e.currentTarget.value.replace(",", ".");
    const regex = new RegExp("^[0-9]*[.,]?[0-9]{0,2}$");
    if (!regex.test(e.currentTarget.value)) return;

    const updatedUser = { name: user.name, value: val, isActive: user.isActive };
    setUsersData((prev) =>
      prev.map((obj) => (obj.name === user.name ? updatedUser : obj))
    );

  };
  
  const activeHandler = (user) => {
    const updatedUser = {
      name: user.name,
      value: user.amount,
      isActive: !user.isActive,
    };
    setUsersData(prev => {
      return prev.map(obj => obj.name === user.name ? updatedUser : obj)
    })
  }

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
              value={totalAmount}
              onChange={setTotalAmountHandler}
              className={classes.amount}
              type="text"
              placeholder="0,00"
            />
            <div>zł</div>
          </div>
          <div className={classes.divider}></div>
          <h1>
            <input type="text" placeholder="Name" />
          </h1>
          <ul className={classes.list}>
            {usersData.map((user) => (
              <li>
                <div className={classes.ownerMiniature}></div>
                <div className={classes.elementText}>
                  <p className={classes.name}>{user.name}</p>
                  <div className={classes.smallAmountDiv}>
                    <input
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
