import Header from "../UI/Header";

const NewExpenseView = () => {
    return (
      <>
        <Header>{appCtx.room.name}</Header>
        <div className={classes.container}>
          <div className={classes.expense}>
            <div className={classes.top}>
              <div className={classes.ownerMiniature}></div>
              <h1>{appCtx.expense.owner}</h1>
            </div>
            <div className={classes.amount}>
              <p>{appCtx.expense.amount}zł</p>
            </div>
            <div className={classes.divider}></div>
            <h1>{appCtx.expense.name}</h1>
            <ul className={classes.list}>
              {Object.keys(appCtx.expense.users).map((user) => (
                <li>
                  <div className={classes.ownerMiniature}></div>
                  <div className={classes.elementText}>
                    <p className={classes.name}>{user}</p>
                    <p className={classes.smallAmount}>
                      {appCtx.expense.users[user]}zł
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    );
}

export default NewExpenseView