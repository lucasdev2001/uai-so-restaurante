
import { useState, useEffect } from "react";
import Marmita from "../components/Marmita";
const Cozinha = () => {
    const [pedidos, setPedidos] = useState([]);
    useEffect(() => {
        const interval = setInterval(async () => {
            let pedidosServer = await (await fetch('http://localhost:3001/api/pedidosliberados')).json();
            setPedidos(pedidosServer);
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    const deletarPedido = (e) => {
        if (window.confirm("Tem certeza que deseja finalizar o pedido ?") === true) {
            fetch('http://localhost:3001/api/pedidos', {
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

    return (
        <>
            <main>
                <div className="container-fluid">
                    <h1 className="text-center">Cozinha</h1>
                    <div className="row">
                        {pedidos.map((e, index) => {
                            return <>
                                <div className="row m-3" key={index}>
                                    <h2>Pedido {e._id}</h2>
                                    <div>
                                        <button className="btn btn-success m-1" onClick={deletarPedido} id={e._id}>Finalizar Pedido</button>
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
                                            <hr/>
                                        </>
                                    })}
                                </div>
                            </>
                        })}
                    </div>
                </div>
            </main>
        </>
    )
}

export default Cozinha;