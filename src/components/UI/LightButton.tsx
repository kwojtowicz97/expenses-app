import classes from "./LightButton.module.css"

const LigthButton:React.FC<{owner?: boolean}> = (props) => {
    return <button className={`${classes.button} + ${props.owner &&classes.owner}`}>{props.children}</button>
}

export default LigthButton