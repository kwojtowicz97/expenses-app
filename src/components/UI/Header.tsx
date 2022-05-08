import classes from "./Header.module.css";
import { useState } from "react";

const Header: React.FC<{
  first?: { symbol: string; onClick: () => void };
  second?: { symbol: string; onClick: () => void };
  code: string | boolean
}> = (props) => {
  const [showCode, setShowCode] = useState(false)
  const handleClick = () => {
    setShowCode(prevState => !prevState)
  }
  return (
    <div className={classes.wrapper}>
      <div className={classes.header} onClick={handleClick}>{props.code && showCode ? props.code : props.children}</div>
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
