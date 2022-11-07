import { useState } from 'react';
import voucher_codes from 'voucher-code-generator'
function App() {
  const [marmita, setMarmita] = useState({
    arrozEscolhido: "",
    feijaoEscolhido: "",
    salada: "",
    macarrao: "",
    carne: Array,
    complemento: Array,
  });

  const [pedidoPessoa, setPedidoPessoa] = useState([]);

  const handInputchange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setMarmita({
      ...marmita,
      [name]: value
    });
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
      document.getElementById('formPrincipal').reset();


    } else {
      document.getElementById('formPrincipal').reset();
    }

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
      liberadoParaCozinha:false,
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
          <h1 className='text-center'>Monte Sua Marmita</h1>
          <div className='row'>
            <div className='col-6'>
              <form method='POST' onSubmit={onSubmit} id='formPrincipal'>
                <legend>Escolha um tipo arroz: </legend>
                <div className='form-check mb-3'>
                  <input className='form-check-input' type={'radio'} name={'arrozEscolhido'} value={'Branco'} onChange={handInputchange} required></input>
                  <label className="form-check-label">
                    Branco
                  </label>
                  <br />
                  <input className='form-check-input' type={'radio'} name={'arrozEscolhido'} value={'Integral'} onChange={handInputchange} required></input>
                  <label className="form-check-label">
                    Integral
                  </label>
                  <br />
                  <input className='form-check-input' type={'radio'} name={'arrozEscolhido'} value={''} onChange={handInputchange} required></input>
                  <label className="form-check-label">
                    Sem Arroz
                  </label>
                </div>
                <legend>Escolha um tipo de feijão: </legend>
                <div className='form-check mb-3'>
                  <input className='form-check-input' type={'radio'} name={'feijaoEscolhido'} value={'Caldo'} onChange={handInputchange} required></input>
                  <label className="form-check-label">
                    Caldo
                  </label>
                  <br />
                  <input className='form-check-input' type={'radio'} name={'feijaoEscolhido'} value={'Tropeiro'} onChange={handInputchange} required></input>
                  <label className="form-check-label">
                    Tropeiro
                  </label>
                  <br />
                  <input className='form-check-input' type={'radio'} name={'feijaoEscolhido'} value={""} onChange={handInputchange} required></input>
                  <label className="form-check-label">
                    Sem feijão
                  </label>
                </div>
                <legend>Aceita Macarrão ?</legend>
                <div className='form-check mb-3'>
                  <input className='form-check-input' type={'radio'} name={'macarrao'} value={'Macarrão'} onChange={handInputchange} required></input>
                  <label className="form-check-label">
                    Sim
                  </label>
                  <br />
                  <input className='form-check-input' type={'radio'} name={'macarrao'} value={''} onChange={handInputchange} required></input>
                  <label className="form-check-label">
                    Não
                  </label>
                </div>
                <legend>Aceita Salada ?</legend>
                <div className='form-check mb-3'>
                  <input className='form-check-input' type={'radio'} name={'salada'} value={'Salada'} onChange={handInputchange} required></input>
                  <label className="form-check-label">
                    Sim
                  </label>
                  <br />
                  <input className='form-check-input' type={'radio'} name={'salada'} value={''} onChange={handInputchange} required></input>
                  <label className="form-check-label">
                    Não
                  </label>
                </div>

                <legend>Escolha até duas carnes</legend>
                <div className='form-check mb-3'>
                  <input className='form-check-input' type={'checkbox'} name={'carne'} value={'filé'} onClick={limitadorCarne}></input>
                  <label className="form-check-label">
                    Filé
                  </label>
                  <br />
                  <input className='form-check-input' type={'checkbox'} name={'carne'} value={'linguiça'} onClick={limitadorCarne} ></input>
                  <label className="form-check-label">
                    Linguiça
                  </label>
                  <br />
                  <input className='form-check-input' type={'checkbox'} name={'carne'} value={'churrasco'} onClick={limitadorCarne}></input>
                  <label className="form-check-label">
                    churrasco
                  </label>
                </div>
                <legend>Escolha até dois complementos</legend>
                <div className='form-check mb-3'>
                  <input className='form-check-input' type={'checkbox'} name={'complemento'} value={'fritas'} onClick={limitadorComplemento}></input>
                  <label className="form-check-label">
                    Fritas
                  </label>
                  <br />
                  <input className='form-check-input' type={'checkbox'} name={'complemento'} value={'purê'} onClick={limitadorComplemento}></input>
                  <label className="form-check-label">
                    Purê
                  </label>
                  <br />
                  <input className='form-check-input' type={'checkbox'} name={'complemento'} value={'farofa'} onClick={limitadorComplemento}></input>
                  <label className="form-check-label">
                    Farofa
                  </label>
                  <br />
                  <input className='form-check-input' type={'checkbox'} name={'complemento'} value={'abóbora'} onClick={limitadorComplemento}></input>
                  <label className="form-check-label">
                    Abóbora
                  </label>
                </div>

                <button type="submit" className="btn btn-primary">Adicionar ao carrinho 🛒</button>
              </form>
            </div>
            <div className='col-6 text-center'>
              <h2 className>Seu Carrinho 🛒</h2>
              {pedidoPessoa.map((e, index) => {
                return <p key={index}>{e.arrozEscolhido + " " + e.feijaoEscolhido + " " + e.salada + " " + e.macarrao + " " + e.carne.map((e) => { return e })}</p>
              })}
              <form method='POST' action='/api' onSubmit={enviarForm}>
                <button type="submit" class="btn btn-primary">Enviar</button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
