
import { useState, useEffect } from "react";
import Marmita from "../components/Marmita";
const Pedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    useEffect(() => {
        const interval = setInterval(async () => {
            let pedidosServer = await (await fetch('/api/pedidos')).json();
            setPedidos(pedidosServer);
        }, 1000);
        return () => clearInterval(interval);

    }, []);
    const deletarPedido = (e) => {
        if (window.confirm("Tem certeza que deseja deletar ?") === true) {
            fetch('/api/pedidos', {
                method: "DELETE",
                body: JSON.stringify({
                    _id: e.target.id
                }),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            })
        } else {
            window.alert("ok")
        }
    }
    const liberarPedido = (e) => {
        fetch('/api/pedidos/liberar', {
            method: "PUT",
            body: JSON.stringify({
                _id: e.target.id.toString()
            }),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(response => response.json())
            .then(json => console.log(json))
            .catch(err => console.log(err))
    }
    return <>
        <main>
            <div className="container-fluid">
                <h1 className="text-center">Pedidos esperando aprovação</h1>
                <div className="row">
                    {pedidos.map((e, index) => {
                        return <>
                            <div className="row m-3" key={index}>
                                <h2>Pedido {e._id}</h2>
                                <div>
                                    <button className="btn btn-primary m-1" onClick={liberarPedido} id={e._id}>Aprovar Pedido</button>
                                    <button className="btn btn-danger m-1" onClick={deletarPedido} id={e._id}>Rejeitar Pedido</button>
                                </div>
                                {e.marmitas.map((e, index) => {
                                    return <>
                                        <Marmita
                                            key={index}
                                            arroz={e.arrozEscolhido}
                                            feijao={e.feijaoEscolhido}
                                            salada={e.salada}
                                            macarrao={e.macarrao}
                                            carne={e.carne.toString()}
                                            complemento={e.complemento.toString()}
                                            quantidade={e.quantidade}
                                        />
                                        <br />
                                    </>
                                })}
                            </div>
                        </>
                    })}
                </div>
            </div>
        </main>
    </>
}
export default Pedidos;