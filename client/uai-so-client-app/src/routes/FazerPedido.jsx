import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import voucher_codes from 'voucher-code-generator'
import InputRotativo from '../components/InputRotativo';
import Marmita from '../components/Marmita';
function FazerPedido() {
  const [idPedido, setIDPedido] = useState(null);
  let [pedidoPessoa, setPedidoPessoa] = useState([]);
  const [cardapio, setCardapio] = useState(null);
  useEffect(() => {
    fetch("/api/cardapio")
      .then((res) => res.json())
      .then((data) => setCardapio(data));
  }, []);
  const refEtapa = useRef({
    etapa: 0
  });
  const nomesEtapas = [
    "Escolha seu arroz",
    "Escolha seu feijão",
    "Aceita macarrão ?",
    "Aceita Salada ?",
    "Escolha até duas carnes",
    "Escolha até dois complementos",
    "Quantidade",
    "Seu pedido",
  ];
  let [marmita, setMarmita] = useState({
    arrozEscolhido: "",
    feijaoEscolhido: "",
    salada: "",
    macarrao: "",
    carne: Array || "",
    complemento: Array || "",
    quantidade: "1"
  });
  function slider(etapa) {
    let etapas = document.querySelectorAll('.etapa');
    const nomeEtapa = document.querySelector('#nome-etapa');
    etapas.forEach((e) => {
      e.setAttribute('hidden', true);
    })
    etapas[etapa].removeAttribute('hidden')
    document.getElementById('voltar').removeAttribute('disabled')
    nomeEtapa.innerHTML = nomesEtapas[etapa];
  }
  const handleEtapa = (e) => {
    let id = e.target.id
    const barraProgresso = document.querySelector('#barra-progresso');
    switch (id) {
      case 'avançar':
        if (refEtapa.current.etapa === nomesEtapas.length - 2) {
          document.getElementById('finalizar').removeAttribute('hidden');
          document.getElementById('avançar').setAttribute('hidden', true);
          montarMarmita();
        }
        if (refEtapa.current.etapa < nomesEtapas.length - 1) {
          let inputsDivAtual = document.getElementById(`${refEtapa.current.etapa}`);
          if (1 === 0) {
            window.alert('Você deve escolher ao menos um')
          } else {
            refEtapa.current.etapa += 1;
            barraProgresso.style.width = `${(100 / nomesEtapas.length + 3) * refEtapa.current.etapa}%`;
            slider(refEtapa.current.etapa);
            console.log(refEtapa.current.etapa);
          }
        }
        break;
      case 'voltar':
        if (refEtapa.current.etapa > 0) {
          refEtapa.current.etapa -= 1;
          barraProgresso.style.width = `${(100 / nomesEtapas.length + 3) * refEtapa.current.etapa}%`;
          slider(refEtapa.current.etapa);
        }
        if (refEtapa.current.etapa === 0) {
          document.getElementById('voltar').setAttribute('disabled', true);
        }
        if (refEtapa.current.etapa <= nomesEtapas.length - 2) {
          document.getElementById('avançar').removeAttribute('hidden');
          document.getElementById('finalizar').setAttribute('hidden', true);
        }
        break;
      default: console.log('error');
        break;
    }
  }
  const handInputchange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setMarmita({
      ...marmita,
      [name]: value
    });
    console.log(marmita);
  }
  const limitadorCarne = (event) => {
    let inputCarnes = document.querySelectorAll('input[name="carne"]:checked');
    if (inputCarnes.length >= 3) {
      event.target.checked = false;
    } // limita o número de checkbox selecionadas
  }
  const limitadorComplemento = (event) => {
    let inputCarnes = document.querySelectorAll('input[name="complemento"]:checked');
    if (inputCarnes.length >= 3) {
      event.target.checked = false;
    } // limita o número de checkbox selecionadas
  }
  const montarMarmita = () => {
    let arrCarnes = [];
    let arrComplementos = [];
    let inputCarnes = document.querySelectorAll('input[name="carne"]:checked');
    let inputComplementos = document.querySelectorAll('input[name="complemento"]:checked');
    inputCarnes.forEach(element => {
      arrCarnes.push(element.value);
    });
    inputComplementos.forEach(element => {
      arrComplementos.push(element.value);
    });
    setMarmita({
      ...marmita,
      carne: marmita.carne = arrCarnes,
      complemento: marmita.complemento = arrComplementos
    })
    console.log(marmita);
  }
  const onAdicionarMarmita = () => {
    console.log(pedidoPessoa.length);
    const barraProgresso = document.querySelector('#barra-progresso');
    barraProgresso.style.width = `0%`;
    document.getElementById('avançar').removeAttribute('hidden');
    document.getElementById('finalizar').setAttribute('hidden', true);
    document.getElementById('form-marmita').reset();
    refEtapa.current.etapa = 0;
    slider(0);
    setPedidoPessoa(current => [...current, marmita]);

  }
  const onFinalizar = async (event) => {
    event.preventDefault()
    document.querySelectorAll('.etapa').forEach((e)=>e.setAttribute('hidden',true));
    console.log(marmita);
    pedidoPessoa.push(marmita);
    setPedidoPessoa(current => [...current, marmita]);
    console.log(pedidoPessoa);
    let idPedido = voucher_codes.generate({
      length: 3,
      count: 1,
      charset: "0123456789abc"
    });
    let pedidoParaServer = {
      _id: idPedido.toString(),
      liberadoParaCozinha: false,
      marmitas: pedidoPessoa
    }
    fetch('/api/pedidos', {
      method: "POST",
      body: JSON.stringify(pedidoParaServer),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    })
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(err => console.log(err))
    setPedidoPessoa([]);
    setIDPedido(idPedido.toString());
    document.getElementById('6').setAttribute('hidden', true);
    document.getElementById('mostrarId').removeAttribute('hidden');
    await setTimeout(20000);
    console.log("Waited 5s");

  }
  function UmaMarmita(props) {
    return <Marmita
      arroz={marmita.arrozEscolhido}
      feijao={marmita.feijaoEscolhido}
      salada={marmita.salada}
      macarrao={marmita.macarrao}
      carne={marmita.carne.toString()}
      complemento={marmita.complemento.toString()}
      quantidade={marmita.quantidade}
    />
  }
  function MultiplasMarmitas(props) {
    return (
      pedidoPessoa.map((e) => {
        return <Marmita
          arroz={e.arrozEscolhido}
          feijao={e.feijaoEscolhido}
          salada={e.salada}
          macarrao={e.macarrao}
          carne={e.carne.toString()}
          complemento={e.complemento.toString()}
          quantidade={e.quantidade}
        />
      })
    )
  }

  return (
    <div className="App">
      <main>
        <div className='container-fluid'>
          <form method="POST" id='form-marmita'>
            <h2 className='text-center display-1' id='nome-etapa'>Escolha seu arroz</h2>

            <div className="progress">
              <div className="progress-bar bg-success" role="progressbar" style={{ width: "0%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" id='barra-progresso'></div>
            </div>
            <div>
              <div className='etapa' id={0}>
                <div className='d-flex justify-content-center mt-5'>
                  <div className='form-check mb-3'>
                    {!cardapio ? "Loading..." : cardapio.arroz.map((e) => {
                      return (
                        <>
                          <InputRotativo value={e} name={'arrozEscolhido'} type={'radio'} onChange={handInputchange} />
                        </>
                      )
                    })}
                    <input className='form-check-input fs-1' type={'radio'} name={'arrozEscolhido'} value={""} onChange={handInputchange} required></input>
                    <label className="form-check-label fs-1">
                      Sem arroz
                    </label>
                  </div>
                </div>
              </div>
              <div className='etapa' id={1} hidden>
                <div className='d-flex justify-content-center mt-5'>
                  <div className='form-check mb-3'>
                    {!cardapio ? "Loading..." : cardapio.feijão.map((e) => {
                      return (
                        <>
                          <InputRotativo value={e} name={'feijaoEscolhido'} type={'radio'} onChange={handInputchange} />
                        </>
                      )
                    })}
                    <input className='form-check-input fs-1' type={'radio'} name={'feijaoEscolhido'} value={""} onChange={handInputchange} required></input>
                    <label className="form-check-label fs-1">
                      Sem feijão
                    </label>
                  </div>
                </div>
              </div>
              <div className='etapa' id={2} hidden>
                <div className='d-flex justify-content-center mt-5'>
                  <div className='form-check mb-3'>
                    <input className='form-check-input fs-1' type={'radio'} name={'macarrao'} value={'Macarrão'} onChange={handInputchange} required></input>
                    <label className="form-check-label fs-1">
                      Sim
                    </label>
                    <br />
                    <input className='form-check-input fs-1' type={'radio'} name={'macarrao'} value={''} onChange={handInputchange} required></input>
                    <label className="form-check-label fs-1">
                      Não
                    </label>
                  </div>
                </div>
              </div>
              <div className='etapa' id={3} hidden>
                <div className='d-flex justify-content-center mt-5'>
                  <div className='form-check mb-3'>
                    <input className='form-check-input fs-1' type={'radio'} name={'salada'} value={'salada'} onChange={handInputchange} required></input>
                    <label className="form-check-label fs-1">
                      Sim
                    </label>
                    <br />
                    <input className='form-check-input fs-1' type={'radio'} name={'salada'} value={''} onChange={handInputchange} required></input>
                    <label className="form-check-label fs-1">
                      Não
                    </label>
                  </div>
                </div>
              </div>
              <div className='etapa' id={4} hidden>
                <div className='d-flex justify-content-center mt-5'>
                  <div className='form-check mb-3'>
                    {!cardapio ? "Loading..." : cardapio.carnes.map((e) => {
                      return (
                        <>
                          <InputRotativo value={e} name={'carne'} type={'checkbox'} onClick={limitadorCarne} onChange={handInputchange} />
                        </>
                      )
                    })}
                  </div>
                </div>
              </div>
              <div className='etapa' id={5} hidden>
                <div className='d-flex justify-content-center mt-5'>
                  <div className='form-check mb-3'>
                    {!cardapio ? "Loading..." : cardapio.complementos.map((e) => {
                      return (
                        <>
                          <InputRotativo value={e} name={'complemento'} type={'checkbox'} onClick={limitadorComplemento} onChange={handInputchange} />
                        </>
                      )
                    })}
                  </div>
                </div>
              </div>
              <div className='etapa' id={6} hidden>
                <div className='d-flex justify-content-center mt-5 fs-1'>
                  <div className='text-center'>
                  <label class="form-label">{marmita.quantidade}</label>
                  <input type="range" className="form-range" min="1" max="10" onChange={handInputchange} value={marmita.quantidade} name="quantidade"></input>
                  </div>
                </div>
              </div>
              <div className='etapa text-center' id={7} hidden>
                <button type="button" className="btn btn-primary btn-lg text-center m-3" onClick={onAdicionarMarmita}>Adicionar marmita</button>
                <span data-bs-toggle="modal" data-bs-target="#exampleModal" className='fs-3'>
                  🛒
                  <span className="badge text-bg-secondary">{pedidoPessoa.length}</span>

                </span>
                <div>
                  <div>
                    <h5 className='text-center'>Pedido Atual</h5>
                    <div className='d-flex justify-content-center'>
                      <UmaMarmita />
                    </div>
                  </div>
                  <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1 className="modal-title fs-5" id="exampleModalLabel">Seu Carrinho</h1>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body row d-flex justify-content-center">
                          <MultiplasMarmitas />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              <div id='mostrarId' hidden>
                <h1 className='display-1 text-center m-5'>Anote seu pedido: {idPedido}</h1>
              </div>
              <div className="d-grid gap-2 d-md-block text-center mt-1">
                <button className="btn btn-primary btn-lg m-1" type="button" id='voltar' onClick={handleEtapa}>voltar</button>
                <button className="btn btn-primary btn-lg m-1" type="button" id='avançar' onClick={handleEtapa}>avançar</button>
                <button className="btn btn-primary btn-lg m-1" type="submit" id='finalizar' hidden onClick={onFinalizar}>finalizar</button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
export default FazerPedido;
