const InputRotativo = (props) => {
    return (
        <>
            <input className='form-check-input' type={'checkbox'} name={props.name} value={props.value} onClick={props.onClick}></input>
            <label className="form-check-label">
                {props.value}
            </label>
            <br/>
        </>
    )
}

export default InputRotativo;