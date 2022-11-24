const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3001;

//rotas
const pedidosRoute = require('./routes/pedidos.route');
const cardapioRoute = require('./routes/cardapio.routes');
//


mongoose.connect('mongodb://127.0.0.1:27017/restaurante-uai-sô-database-dev');
const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(bodyParser.json())



app.use('/api',cardapioRoute.router);
const Cardapio = cardapioRoute.Cardapio;
const cardapioPadrao = new Cardapio({
  _id: "Cardapio-Padrão",
  arroz: ["Arroz branco", "Arroz carreteiro"],
  feijão: ["Feijão Preto", "Feijão Carioca"],
  carnes: ["Filé", "Peixe", "Bife"],
  complementos: ["Farofa", "Maionese", "Gratinado"]
});

Cardapio.countDocuments({ _id: "Cardapio-Padrão" }, function (err, count) {
  if (count > 0) {
    console.log('cardapio padrão já foi criado');
  } else {
    cardapioPadrao.save().then(() => console.log('cardapio padrão criado'));
  }
});

app.use('/api', pedidosRoute.router);


app.get('/api/quantidade', async (req, res) => {

  const quantidadeMarmitasVendidas = await pedidosRoute.MarmitaVendida.find({}).lean().exec();
  res.send(quantidadeMarmitasVendidas);
})



app.listen(port, () => console.log(`escutando na porta ${port}!`));