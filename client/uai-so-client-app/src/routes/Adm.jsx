
import { useState, useEffect } from "react";
import Marmita from "../components/Marmita";
const Adm = () => {
    const [pedidos, setPedidos] = useState([]);
    useEffect(() => {
        const interval = setInterval(async () => {
            let pedidosServer = await (await fetch('/api/pedidos')).json();
            setPedidos(pedidosServer);
        }, 5000);
        return () => clearInterval(interval);

    }, []);
    return <>
        <main>
            <div className="container-fluid">
                <h1 className="text-center">Área do Administrador</h1>
                <div className="row">
                {pedidos.map((e, index) => {
                    return <>
                       <div className="col">
                       <h2 key={index}>Pedido {e._id}</h2>
                        {e.marmitas.map((e) => {
                            return <>
                                <Marmita
                                arroz={e.arrozEscolhido}
                                feijao={e.feijaoEscolhido}
                                salada={e.salada}
                                macarrao={e.macarrao}
                                carne={e.carne.toString()}
                                complemento={e.complemento.toString()}
                                 />
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
export default Adm;