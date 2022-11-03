const marmita = (props) => {
    return <>
        <div className="card" style={{ width: "10rem" }}>
            <div className="card-body">
                <h5 className="card-title">{props.idPedido}</h5>
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
}
export default marmita;