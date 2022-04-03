import Header from "../UI/Header"
import { useContext } from "react"
import { AppContext } from "../../store/app"
import RoomList from "./ExpensesList"
import { useNavigate } from "react-router-dom"

const RoomView: React.FC = (props) => {
  const navigate = useNavigate()
  const addExpenseHandler = () => {
    navigate("/newexpense")
  }
    const appCtx = useContext(AppContext)
    return (
      <>
        <Header onClick={addExpenseHandler}>{appCtx.room.name}</Header>
        <RoomList/>
      </>
    );
}

export default RoomView