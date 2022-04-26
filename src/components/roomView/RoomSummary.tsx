import classes from "./RoomSummary.module.css";
import useFetchData from "../../hooks/useFetchData";

const RoomSummary: React.FC<{ roomData: any; roomID: string; users: any }> = (
  props
) => {
  const { roomData, roomID, users } = props;

  return (
    roomData.transactions && (
      <div className={classes.summaryCard}>
        <div className={classes.cardTitle}>Summary</div>
        <div className={classes.transactions}>
          {roomData.transactions.map((transaction) => {
            return (
              <div
                key={Math.random()}
                className={`${classes.transaction} ${
                  transaction.isPaid && classes.transactionPaid
                }`}
              >
                <div className={classes.transactionUsersContainer}>
                  <div className={classes.transactionArrowIcon}>&#x21b3;</div>
                  <div className={classes.transactionUsers}>
                    <div className={classes.transactionUser}>
                      {`${users[transaction.from].firstName} ${
                        users[transaction.from].lastName
                      }`}
                    </div>
                    <div className={classes.transactionUser}>
                      {`${users[transaction.to].firstName} ${
                        users[transaction.to].lastName
                      }`}
                    </div>
                  </div>
                </div>
                <div className={classes.transactionAmountAndBadge}>
                  <div className={classes.transactionAmount}>
                    {transaction.amount}zł
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
};

export default RoomSummary;
