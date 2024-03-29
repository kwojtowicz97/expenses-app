import classes from "./StatusIcon.module.css";
import { useContext } from "react";
import { AuthContext } from "../../store/auth";


const StatusIcon: React.FC = () => {
    const authCtx = useContext(AuthContext)
    const isLoggedIn = authCtx.authData ? true : false
    return (<div onClick={authCtx.logout} className={`${classes.dot} ${isLoggedIn ? classes.logged : classes["not-logged"]}`}></div>)
}

export default StatusIcon

