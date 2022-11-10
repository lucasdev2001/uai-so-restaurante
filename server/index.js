const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/restaurante-uai-sô-database-dev');
const app = express();
const port = 3001;

const jsonParser = bodyParser.json();

const Pedido = mongoose.model('Pedido', {
  _id: String,
  liberadoParaCozinha: Boolean,
  marmitas: Array
});

const Cardapio = mongoose.model('Cardapio',{
  _id: String,
  arroz: Array,
  feijão: Array,
  carnes: Array,
  complementos: Array,
})


app.post('/api/pedidos', jsonParser, (req, res) => {
  let resposta = req.body;
  const novoPedido = new Pedido(resposta);
  novoPedido.save().then((console.log('sucesso')));
  res.send(resposta);
})

app.delete('/api/pedidos', jsonParser, async (req, res) => {
  try {
    Pedido.deleteOne({ _id: req.body._id }, (err)=> {
      if (err) return handleError(err);
    });
    res.send("success");
  } catch (error) {
    res.send(error);
  }
});

app.put('/api/pedidos/liberar', jsonParser, async (req, res) => {
  try {
    const resUpdate = await Pedido.updateOne({ _id: req.body._id }, { liberadoParaCozinha: true });
    res.send(resUpdate);
  } catch (error) {
    console.log(error);
  }
})

app.get('/api/pedidos', async (req, res) => {
  const pedidos = await Pedido.find({liberadoParaCozinha:false}).lean().exec();
  res.send(pedidos)
})

app.get('/api/pedidosliberados', async (req, res) => {
  const pedidosLiberados = await Pedido.find({liberadoParaCozinha:true}).lean().exec();
  res.send(pedidosLiberados)
})

app.get('/api/cardapio', async(req,res)=>{
  const cardapio = await Cardapio.find({}).lean().exec();
  console.log(cardapio);
  res.json(cardapio) 
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));