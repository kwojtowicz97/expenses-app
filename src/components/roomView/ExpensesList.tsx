import Expense from "./Expense";
import classes from "./ExpensesList.module.css";
import RoomSummary from "./RoomSummary";
import useFetchData from "../../hooks/useFetchData";


const ExpensesList: React.FC<{
  roomData: any;
  roomID: string;
  users: any
}> = (props) => {
  const {roomData, roomID, users} = props
  return (
    <div className={classes.expensesList}>
      {roomData.transactions && (
        <RoomSummary users={users} roomID={props.roomID} roomData={roomData} />
      )}
      {props.roomData.expenses ? (
        Object.keys(props.roomData.expenses).map((item) => (
          <Expense
            users={users}
            key={item}
            expenseData={props.roomData.expenses[item]}
            id={item}
            roomID={props.roomID}
          />
        ))
      ) : (
        <p>There are no expenses yet</p>
      )}
    </div>
  );
};
export default ExpensesList;
