import LigthButton from "./LightButton";
import classes from "./RoomButtonGroup.module.css";

const RoomButtonGroup: React.FC = () => {
  return (
    <div className={classes.RoomButtonGroup}>
      <LigthButton owner>Sopot 2022</LigthButton>
      <LigthButton>Szczawnica 2021</LigthButton>
      <LigthButton>Bieszczady 2021</LigthButton>
    </div>
  );
};

export default RoomButtonGroup;
