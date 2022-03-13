import classes from "./Modal.module.css"
import { useContext } from "react"
import { AuthContext } from "../../store/auth"

const Modal:React.FC = () => {
    const authCtx = useContext(AuthContext)
    return <p className={classes.modal}>{authCtx.error}</p>
}
export default Modal  