import { useContext } from "react";
import { AppContext } from "../../store/app";
import Expense from "./Expense";
import classes from "./ExpensesList.module.css";

const ExpensesList: React.FC = () => {
  const appCtx = useContext(AppContext);
  const room = appCtx.room
  return (
    <div className={classes.expensesList}>
      {room.expenses &&
        room.expenses.map((item) => <Expense item={item} amount={item.amount} date={item.date} name={item.name} owner={item.owner} users={Object.keys(item.users)}/>)}
    </div>
  );
};
export default ExpensesList;
