import Header from "../UI/Header"
import { useContext } from "react"
import { AppContext } from "../../store/app"
import RoomList from "./ExpensesList"

const RoomView: React.FC = (props) => {
    const appCtx = useContext(AppContext)
    return (
      <>
        <Header>{appCtx.room.name}</Header>
        <RoomList/>
      </>
    );
}

export default RoomView