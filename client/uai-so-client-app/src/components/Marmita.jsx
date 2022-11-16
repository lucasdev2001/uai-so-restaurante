const marmita = (props) => {
    return (
        <>
            <div className="card m-2" style={{ width: "20rem" }}>
                <div className="card-body fs-4">
                    <h5 className="card-title">{props.quantidade}x {props.quantidade !== "1"  ? "Marmitas" : "Marmita"}</h5>
                    <ul className="list-group">
                        <li className="list-group-item">{props.arroz}</li>
                        <li className="list-group-item">{props.feijao}</li>
                        <li className="list-group-item">{props.salada}</li>
                        <li className="list-group-item">{props.macarrao}</li>
                        <li className="list-group-item">{props.carne}</li>
                        <li className="list-group-item">{props.complemento}</li>
                    </ul>
                </div>
            </div>
        </>
    )
}
export default marmita;