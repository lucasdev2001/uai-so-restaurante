const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');

const Cardapio = mongoose.model('Cardapio', {
  _id: String,
  arroz: Array,
  feijão: Array,
  carnes: Array,
  complementos: Array,
})

router.get('/cardapio', async (req, res) => {
  const cardapio = await Cardapio.find({}).lean().exec();
  const [primeiroCardapio] = cardapio;
  res.send(primeiroCardapio);
})

router.put('/cardapio', async (req, res) => {
  try {
    console.log(req.body);
    const cardapioPorId = await Cardapio.findOneAndUpdate({ _id: "Cardapio-Padrão" }, req.body).exec();
    res.send(cardapioPorId)
  } catch (error) {
    console.log(error);
  }
})


module.exports = {
  router,
  Cardapio
}