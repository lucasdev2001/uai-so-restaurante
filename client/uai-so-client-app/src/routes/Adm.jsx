import { useEffect } from "react";
import { useState } from "react"
import { Link } from "react-router-dom";

const Adm = () => {
    const [cardapio, setCardapio] = useState(Object)
    useEffect(() => {
        fetch("/api/cardapio")
            .then((res) => res.json())
            .then((data) => setCardapio(data));

    }, []);

    const [item, setItem] = useState({
        arroz: String,
        feijão: String,
        carne: String,
        complemento: String
    })

    const handleInputEvent = (event) => {
        const target = event.target;
        const value = target.value;
        setItem(value)
    }

    const adicionarItemCardapio = (event) => {
        const target = event.target;
        const name = target.name;
        let arrTemp = [];
        switch (name) {
            case 'arroz':
                arrTemp = cardapio.arroz;
                break;
            case 'feijão':
                arrTemp = cardapio.feijão;
                break;
            case 'carnes':
                arrTemp = cardapio.carnes;
                break;
            case 'complementos':
                arrTemp = cardapio.complementos;
                break;

            default:
                break;
        }

        setCardapio({
            ...cardapio,
            [name]: [...arrTemp, item]
        })

    }

    const deletarItem = (e) => {
        const name = e.target.name;
        const itemParaDeletar = e.target.value;
        let arrTemp = [];
        switch (name) {
            case 'arroz':
                arrTemp = cardapio.arroz.filter(valor => valor !== itemParaDeletar);
                console.log(arrTemp);
                break;
            case 'feijão':
                arrTemp = cardapio.feijão.filter(valor => valor !== itemParaDeletar);
                console.log(arrTemp);
                break;
            case 'carnes':
                arrTemp = cardapio.carnes.filter(valor => valor !== itemParaDeletar);
                console.log(arrTemp);
                break;
            case 'complementos':
                arrTemp = cardapio.complementos.filter(valor => valor !== itemParaDeletar);
                console.log(arrTemp);
                break;

            default:
                break;
        }
        console.log(name);
        setCardapio({
            ...cardapio,
            [name]: arrTemp
        })
    }

    const editarCardapio = (e) => {
        fetch('/api/cardapio/', {
            method: "PUT",
            body: JSON.stringify(cardapio),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then((response) => {
                response.json()
                if (response.ok) {
                    window.alert("Cardapio Modificado com Sucesso")
                }
            })
            .then(json => console.log(json))
            .catch(err => console.log(err))

    }

    return (
        <>
            <h1 className="text-center">Área do Administrador</h1>
            <div className="mb-3 text-center">
                <h2>Montar Cardápio</h2>
                <button className="btn btn-primary" onClick={editarCardapio}>Confirmar Alterações</button>
                <div className="row">
                    <div className="col">
                        <h3>Arroz</h3>
                        <input type="text" className="form-control" onChange={handleInputEvent} />
                        <button className="btn btn-primary btn-sm m-2" name="arroz" onClick={adicionarItemCardapio}> Adicionar item</button>
                        {!cardapio.arroz ? "Carregando Cardapio" : cardapio.arroz.map((e) => {
                            return (
                                <>
                                    <div className="row">
                                        <div className="col">
                                            <p>{e}</p>
                                        </div>
                                        <div className="col">
                                            <button className="btn btn-danger btn-sm m-1" value={e} onClick={deletarItem} name="arroz">remover</button>
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                    </div>
                    <div className="col">
                        <h3>Feijão</h3>
                        <input type="text" className="form-control" name="feijão" onChange={handleInputEvent} />
                        <button className="btn btn-primary btn-sm m-2" name="feijão" onClick={adicionarItemCardapio}> Adicionar item</button>
                        {!cardapio.feijão ? "Carregando Cardapio" : cardapio.feijão.map((e) => {
                            return (
                                <>
                                    <div className="row">
                                        <div className="col">
                                            <p>{e}</p>
                                        </div>
                                        <div className="col">
                                            <button className="btn btn-danger btn-sm m-1" value={e} onClick={deletarItem} name="feijão">remover</button>
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                    </div>
                    <div className="col">
                        <h3>Carnes</h3>
                        <input type="text" className="form-control" name="carne" onChange={handleInputEvent} />
                        <button className="btn btn-primary btn-sm m-2" name="carnes" onClick={adicionarItemCardapio}> Adicionar item</button>
                        {!cardapio.carnes ? "Carregando Cardapio" : cardapio.carnes.map((e) => {
                            return (
                                <>
                                    <div className="row">
                                        <div className="col">
                                            <p>{e}</p>
                                        </div>
                                        <div className="col">
                                            <button className="btn btn-danger btn-sm m-1" value={e} onClick={deletarItem} name="carnes">remover</button>
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                    </div>
                    <div className="col">
                        <h3>Complementos</h3>
                        <input type="text" className="form-control" name="complemento" onChange={handleInputEvent} />
                        <button className="btn btn-primary btn-sm m-2" name="complementos" onClick={adicionarItemCardapio}> Adicionar item</button>
                        {!cardapio.complementos ? "Carregando Cardapio" : cardapio.complementos.map((e) => {
                            return (
                                <>
                                    <div className="row">
                                        <div className="col">
                                            <p>{e}</p>
                                        </div>
                                        <div className="col">
                                            <button className="btn btn-danger btn-sm m-1" value={e} onClick={deletarItem} name="complementos">remover</button>
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="mb-3 text-center">
                <h2>Autorizar Pedidos</h2>
                <Link to={'/pedidos'}>
                    <button class="btn btn-primary" role="button">Autorizar</button>
                </Link>
            </div>
        </>
    )
}

export default Adm