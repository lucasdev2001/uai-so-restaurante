const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/restaurante-uai-sô-database-dev');
const app = express();
const port = 3001;


const jsonParser = bodyParser.json();

app.use(express.static(path.join(__dirname, "../client/uai-so-client-app", "build")));

const Pedido = mongoose.model('Pedido', {
  _id: String,
  liberadoParaCozinha: Boolean,
  marmitas: Array,
  quantidadeTotal: Number
});

const Cardapio = mongoose.model('Cardapio',{
  _id: String,
  arroz: Array,
  feijão: Array,
  carnes: Array,
  complementos: Array,
})

const MarmitaVendida = mongoose.model('MarmitasVendidas',{
  _id: String,
  quantidade: Number
});

const cardapioPadrao = new Cardapio({
  _id:"Cardapio-Padrão",
  arroz:["Arroz branco","Arroz carreteiro"],
  feijão:["Feijão Preto","Feijão Carioca"],
  carnes:["Filé","Peixe","Bife"],
  complementos:["Farofa","Maionese","Gratinado"]
 });

Cardapio.countDocuments({_id: "Cardapio-Padrão"}, function (err, count){ 
  if(count>0){
      console.log('cardapio padrão já foi criado');
  }else {
    cardapioPadrao.save().then(()=>console.log('cardapio padrão criado'));
  }
});


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
  const dataAtual =  new Date().toLocaleDateString();
  MarmitaVendida.countDocuments({_id: dataAtual}, function (err, count){
    if(count>0){
        console.log('Data atual salva');
    }else {
      const marmitasVendidasHoje = new MarmitaVendida({
        _id:dataAtual,
        quantidade: 0
      })
      marmitasVendidasHoje.save().then(()=>console.log('registro de marmitas criado'));
    }
  });
  try {
    const resUpdate = await Pedido.updateOne({ _id: req.body._id }, { liberadoParaCozinha: true });
    res.send(resUpdate);
  } catch (error) {
    console.log(error);
  }
  const resFind = await Pedido.findById(req.body._id).lean().exec();
  console.log(resFind.quantidadeTotal);
  const quantidadeDePedidosLiberados = await MarmitaVendida.find({_id:dataAtual}).lean().exec();
  const [quantidadeDePedidosLiberadosHoje] = quantidadeDePedidosLiberados;
  
  try {
    const resUpdateQuantidade = await MarmitaVendida.updateOne({ _id:dataAtual}, { quantidade: quantidadeDePedidosLiberadosHoje.quantidade + resFind.quantidadeTotal});
    console.log(resUpdateQuantidade);
    console.log(quantidadeDePedidosLiberadosHoje.quantidade);
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

app.get('/api/quantidade',async (req,res)=>{
  
  const quantidadeMarmitasVendidas = await MarmitaVendida.find({}).lean().exec();
  res.send(quantidadeMarmitasVendidas);
})

app.get('/api/cardapio', async(req,res)=>{
  const cardapio = await Cardapio.find({}).lean().exec();
  const[primeiroCardapio] = cardapio;
  res.send(primeiroCardapio);
})

app.put('/api/cardapio',jsonParser, async (req,res)=>{
  try {
    console.log(req.body);
    const cardapioPorId = await Cardapio.findOneAndUpdate({ _id: "Cardapio-Padrão" },req.body).exec();
    res.send(cardapioPorId)
  } catch (error) {
    console.log(error);
  }
})

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../client/uai-so-client-app/build')));
    
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}


app.listen(port, () => console.log(`Example app listening on port ${port}!`));