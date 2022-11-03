const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/restaurante-uai-sô-database-dev');
const app = express();
const port = 3001;

const jsonParser = bodyParser.json();

const Pedido = mongoose.model('Pedido', {
    _id: String,
    marmitas: Array
 });


app.post('/api', jsonParser, (req, res) => {
    let resposta = req.body;
    const novoPedido = new Pedido(resposta);
    novoPedido.save().then((console.log('sucesso')));
    res.send(resposta);
})

app.get('/api/pedidos',async (req, res) => {
    const pedidos = await Pedido.find({}).lean().exec();
  res.send(pedidos)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));