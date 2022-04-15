import { useContext } from "react";
import { AppContext } from "../../store/app";
import Expense from "./Expense";
import classes from "./ExpensesList.module.css";

const ExpensesList: React.FC = () => {
  const appCtx = useContext(AppContext);

  
  
  return (
    <div className={classes.expensesList}>
      {appCtx.room.expenses ? (
        Object.values(appCtx.room.expenses).map((item) => (
          <Expense
            item={item}
            amount={item.amount}
            date={item.date}
            name={item.name}
            owner={item.owner}
            users={item.users}
          />
        ))
      ) : (
        <p>There is no expenses yet</p>
      )}
    </div>
  );
};
export default ExpensesList;
