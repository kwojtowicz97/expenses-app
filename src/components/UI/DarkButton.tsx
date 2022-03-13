import classes from "./DarkButton.module.css";

const DarkButton: React.FC<{onClick?: (() => void)}> = (props) => {
    return <button className={classes.button} onClick={props.onClick}>{props.children}</button>
}

export default DarkButton