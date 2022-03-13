import classes from "./Header.module.css"

const Header: React.FC = (props) => {
    return <p className={classes.header}>{props.children}</p>
}

export default Header