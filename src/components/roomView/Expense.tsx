import classes from "./Expense.module.css";
import { Room } from "../../@types/app";
import { Event } from "../../@types/app";
import { useContext } from "react";
import { AppContext } from "../../store/app";
import { useNavigate } from "react-router-dom";

const Expense: React.FC<Event> = (props) => {
  const appCtx = useContext(AppContext)
  const navigate = useNavigate()

  const clickHandler = () => {
    appCtx.setExpense(props.item)
    navigate("/detail")
  }
  return (
    <div onClick={clickHandler} className={classes.roomSummary}>
      <h1 id="header">{props.name}</h1>
      <div className={classes.ownerMiniature}></div>
      <p className={classes.amount}>{`${props.amount}zł`}</p>
      <div className={classes.divider}></div>
      <div className={classes.date}>
        <span className="fa-solid fa-calendar fa-xl"></span>
        <span>{props.date}</span>
      </div>
      <div className={classes.users}>
        {Object.keys(props.users).map((user) => (
          props.users[user] !== "0" && <div className={classes.miniPicture}></div>
        ))}
      </div>
    </div>
  );
};

export default Expense;
