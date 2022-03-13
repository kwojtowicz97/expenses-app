import classes from "./CreateUserView.module.css"

const NewAccountView: React.FC = () => {
    const onLoginSubmit = (event: React.FormEvent) => {
        event.preventDefault()

    };

    return (
      <div className={classes.container}>
        <p className={classes.header}>New Account</p>
        <form onSubmit={onLoginSubmit} className={classes.form}>
          <div className={classes["input-group"]}>
            <label htmlFor="user">E-Mail</label>
            <input id="user" type="text"></input>
          </div>
          <div className={classes["input-group"]}>
            <label htmlFor="password">Password</label>
            <input id="password" type="text"></input>
          </div>
          <div className={classes["input-group"]}>
            <label htmlFor="password">Confirm Password</label>
            <input id="password" type="text"></input>
          </div>
          <button className={classes.button}>Create</button>
        </form>
      </div>
    );
}

export default NewAccountView;