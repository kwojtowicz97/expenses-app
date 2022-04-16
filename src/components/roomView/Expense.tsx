import classes from "./Expense.module.css";
import { Room } from "../../@types/app";
import { useContext } from "react";
import { AppContext } from "../../store/app";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Expense: React.FC<{expenseData: any, id: string, roomID: string}> = (props) => {
  console.log("expense")
  const navigate = useNavigate()

  const clickHandler = () => {
    navigate(`/detail/${props.roomID}/${props.id}`)
  }
  return (
    <div onClick={clickHandler} className={classes.roomSummary}>
      <h1 id="header">{props.expenseData.name}</h1>
      <div className={classes.ownerMiniature}></div>
      <p className={classes.amount}>{`${props.expenseData.amount}zł`}</p>
      <div className={classes.divider}></div>
      <div className={classes.date}>
        <span className="fa-solid fa-calendar fa-xl"></span>
        <span>{props.expenseData.date}</span>
      </div>
      <div className={classes.users}>
        {Object.keys(props.expenseData.users).map((user) => (
          props.expenseData.users[user] !== "0" && <div className={classes.miniPicture}></div>
        ))}
      </div>
    </div>
  );
};

export default Expense;
