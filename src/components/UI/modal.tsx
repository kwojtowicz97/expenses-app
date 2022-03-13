import classes from "./Modal.module.css"
import { useContext } from "react"
import { AppContext } from "../../store/app"

const Modal:React.FC = () => {
    const appCtx = useContext(AppContext)
    return <p className={classes.modal}>{appCtx.error.replace("_", " ")}</p>;
}
export default Modal  