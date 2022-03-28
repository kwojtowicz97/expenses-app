import { useNavigate } from "react-router-dom";
import classes from "./Header.module.css";

const Header: React.FC = (props) => {
    const navigate = useNavigate()
const addRoomhandler = () => {
    navigate("/newroom")
}

  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>{props.children}</div>
      <div className={classes.controls}>
        <div onClick={addRoomhandler} className={classes.controlButton}>+</div>
      </div>
    </div>
  );
};

export default Header;
