import "../inicial.css";
import { Link } from "react-router-dom";
const Inicial = () => {
  return (
    <>
      <main className="inicial">
        <div className="position-absolute top-50 start-50 translate-middle text-center p-4 card-principal">
          <h1 className="text-white p-5">Faça seu Pedido aqui!!!</h1>
          <div className="">
            <Link to={"fazerpedido"}>
              <button className="botao-pagina-inicial">Iniciar Pedidos</button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Inicial;
