import { useContext } from "react";
import { useState } from "react";
import { AppContext } from "../../store/app";
import { useEffect } from "react";
import Expense from "./Expense";
import classes from "./ExpensesList.module.css";

const ExpensesList: React.FC<{roomData: {expenses: any[]}; roomID: string}> = (props) => {
  
  return (
    <div className={classes.expensesList}>
      {props.roomData.expenses ? (
        Object.keys(props.roomData.expenses).map((item) => (
          <Expense key={item} expenseData={props.roomData.expenses[item]} id={item} roomID={props.roomID} />
        ))
      ) : (
        <p>There is no expenses yet</p>
      )}
    </div>
  );
};
export default ExpensesList;
