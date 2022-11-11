import { useEffect } from 'react';
import { useState } from 'react';
import voucher_codes from 'voucher-code-generator'
import InputRotativo from '../components/InputRotativo';
function Root() {

  const [cardapio, setCardapio] = useState(null);
  useEffect(() => {
    fetch("/api/cardapio")
      .then((res) => res.json())
      .then((data) => setCardapio(data));
  }, []);

  const [etapa,setEtapa] = useState(0);

  const [marmita, setMarmita] = useState({
    arrozEscolhido: "",
    feijaoEscolhido: "",
    salada: "",
    macarrao: "",
    carne: Array,
    complemento: Array,
  });

  const [pedidoPessoa, setPedidoPessoa] = useState([]);

  const handleEtapa = (e)=>{

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

  const onSubmit = (event) => {
    event.preventDefault();
    if (window.confirm("Tem certeza que deseja adicionar ao carrinho ?") === true) {
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

      marmita.carne = arrCarnes;
      marmita.complemento = arrComplementos;

      setPedidoPessoa([...pedidoPessoa, marmita]);
      document.getElementById('form-marmita').reset();


    } else {
      document.getElementById('form-marmita').reset();
    }

    console.log(marmita);

  }

  const enviarForm = async (event) => {
    event.preventDefault();
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
    window.alert(`Anote o código do seu pedido: ${idPedido}`)

    setPedidoPessoa([]);

  }

  return (
    <div className="App">
      <main>
        <div className='container-fluid'>
          <form  method="POST" onSubmit={onSubmit} id='form-marmita'>
          <h2 className='text-center display-1'>Escolha seu arroz</h2>
          <div class="progress">
            <div class="progress-bar bg-bg-primary" role="progressbar" style={{ width: "20%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <div>

            <div>
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
            <div>
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
            <div>
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
            <div>
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
            <div>
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
            <div>
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
            
            <div class="d-grid gap-2 d-md-block text-center mt-4">
              <button class="btn btn-primary btn-lg m-2" type="button" id='voltar' onClick={handleEtapa}>voltar</button>
              <button class="btn btn-primary btn-lg m-2" type="button" id='avançar' onClick={handleEtapa}>avançar</button>
            </div>


          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Root;
