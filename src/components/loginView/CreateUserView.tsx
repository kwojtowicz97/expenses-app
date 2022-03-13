import classes from "./CreateUserView.module.css"

const LoginView: React.FC = () => {
    const onLoginSubmit = (event: React.FormEvent) => {
        event.preventDefault()

    };

    return (
      <div className={classes.container}>
        <p className={classes.header}>Login</p>
        <form onSubmit={onLoginSubmit} className={classes.form}>
          <div className={classes["input-group"]}>
            <label htmlFor="user">User</label>
            <input id="user" type="text"></input>
          </div>
          <div className={classes["input-group"]}>
            <label htmlFor="password">Password</label>
            <input id="password" type="text"></input>
          </div>
          <button className={classes.button}>Login</button>
        </form>
        <button className={classes.button}>New Account</button>
      </div>
    );
}

export default LoginView