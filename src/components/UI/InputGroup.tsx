import classes from "./InputGroup.module.css"

const InputGroup: React.FC<{
  label: string;
  id: string;
  pref: React.RefObject<HTMLInputElement>;
  type: string;
}> = (props) => {
  return (
    <div className={classes["input-group"]}>
      <label htmlFor={props.id}>{props.label}</label>
      <input ref={props.pref} id={props.id} type={props.type}>
        {props.children}
      </input>
    </div>
  );
};

export default InputGroup