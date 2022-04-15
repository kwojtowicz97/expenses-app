import { useNavigate } from "react-router-dom";
import classes from "./Header.module.css";

const Header: React.FC<{
  first?: { symbol: string; onClick: () => void };
  second?: { symbol: string; onClick: () => void };
}> = (props) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>{props.children}</div>
      <div className={classes.controls}>
        {props.first && <div onClick={props.first.onClick} className={classes.controlButton}>
          {props.first.symbol}
        </div>}
        {props.second && <div onClick={props.second.onClick} className={classes.controlButton}>
          {props.second.symbol}
        </div>}
      </div>
    </div>
  );
};

export default Header;
