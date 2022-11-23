const InputRotativo = (props) => {
  return (
    <>
      <input
        className="form-check-input fs-1"
        type={props.type}
        name={props.name}
        value={props.value}
        onClick={props.onClick}
        onChange={props.onChange}
      ></input>
      <label className="form-check-label fs-1">{props.value}</label>
      <br />
    </>
  );
};

export default InputRotativo;
