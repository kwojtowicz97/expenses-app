import classes from "./expenseDetail.module.css";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../store/app";
import Header from "../UI/Header";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const ExpenseDetail: React.FC = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [expenseData, setExpenseData] = useState(null);
  const { id, roomID } = useParams();

  useEffect(() => {
    fetchExpense(roomID, id)
  }, [])

  const appCtx = useContext(AppContext);

  const fetchExpense = async (roomID, expenseID) => {
    try {
      const response = await fetch(
        `https://expensesapp-a0382-default-rtdb.europe-west1.firebasedatabase.app/rooms/${roomID}/expenses/${expenseID}.json`
      );
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const fetchedExpenseData = await response.json();
      console.log(fetchedExpenseData)
      setExpenseData(fetchedExpenseData);
      setIsLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    
    isLoaded ? <>
      <Header>{expenseData.name}</Header>
      <div className={classes.container}>
        <div className={classes.expense}>
          <div className={classes.top}>
            <div className={classes.ownerMiniature}></div>
            <h1>{expenseData.owner}</h1>
          </div>
          <div className={classes.amount}>
            <p>{expenseData.amount}zł</p>
          </div>
          <div className={classes.divider}></div>
          <h1>{expenseData.name}</h1>
          <ul className={classes.list}>
            {Object.keys(expenseData.users).map((user) => (
              <li>
                <div className={classes.ownerMiniature}></div>
                <div className={classes.elementText}>
                  <p className={classes.name}>{user}</p>
                  <p className={classes.smallAmount}>
                    {expenseData.users[user]}zł
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </> : <p>Loading...</p>
  );
};

export default ExpenseDetail;
