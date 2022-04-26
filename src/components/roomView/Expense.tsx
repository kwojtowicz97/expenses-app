import classes from "./Expense.module.css";
import { useNavigate } from "react-router-dom";
import Avatar from "../UI/Avatar";

const Expense: React.FC<{
  expenseData: any;
  id: string;
  roomID: string;
  users: any;
}> = (props) => {
  const navigate = useNavigate();

  const { expenseData, id, users } = props;

  return (
    <div
      onClick={() => {
        navigate(`/detail/${props.roomID}/${props.id}`);
      }}
      className={classes.roomSummary}
    >
      <h1 id="header">{props.expenseData.name}</h1>
      <div className={classes.ownerMiniature}>
        <Avatar key="ownerPhoto" size={80} user={users[expenseData.owner]} />
      </div>
      <p className={classes.amount}>{`${props.expenseData.amount}zł`}</p>
      <div className={classes.divider}></div>
      <div className={classes.date}>
        <span className="fa-solid fa-calendar fa-xl"></span>
        <span>{props.expenseData.date}</span>
      </div>
      <div className={classes.users}>
        {Object.keys(props.expenseData.users).map(
          (user) =>
            props.expenseData.users[user] !== "0" && (
              <div key={user} className={classes.miniPicture}>
                <Avatar key={`photo${user}`} size={48} user={users[user]} />
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Expense;
