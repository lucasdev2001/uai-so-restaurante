const express = require("express");
const router = express.Router();

router.get("/pedidos", async (req, res) => {
  const pedidos = await Pedido.find({ liberadoParaCozinha: false })
    .lean()
    .exec();
  res.send(pedidos);
});

router.get("/pedidosliberados", async (req, res) => {
  const pedidosLiberados = await Pedido.find({ liberadoParaCozinha: true })
    .lean()
    .exec();
  res.send(pedidosLiberados);
});

router.post("/pedidos", (req, res) => {
  let resposta = req.body;
  const novoPedido = new Pedido(resposta);
  novoPedido.save().then(console.log("sucesso"));
  res.send(resposta);
});

router.put("/pedidos/liberar",async (req, res) => {
    const dataAtual = new Date().toLocaleDateString();
  MarmitaVendida.countDocuments({ _id: dataAtual }, function (err, count) {
    if (count > 0) {
      console.log("Data atual salva");
    } else {
      const marmitasVendidasHoje = new MarmitaVendida({
        _id: dataAtual,
        quantidade: 0,
      });
      marmitasVendidasHoje
        .save()
        .then(() => console.log("registro de marmitas criado"));
    }
  });
  try {
    const resUpdate = await Pedido.updateOne(
      { _id: req.body._id },
      { liberadoParaCozinha: true }
    );
    res.send(resUpdate);
  } catch (error) {
    console.log(error);
  }
  const resFind = await Pedido.findById(req.body._id).lean().exec();
  console.log(resFind.quantidadeTotal);
  const quantidadeDePedidosLiberados = await MarmitaVendida.find({
    _id: dataAtual,
  })
    .lean()
    .exec();
  const [quantidadeDePedidosLiberadosHoje] = quantidadeDePedidosLiberados;

  try {
    const resUpdateQuantidade = await MarmitaVendida.updateOne(
      { _id: dataAtual },
      {
        quantidade:
          quantidadeDePedidosLiberadosHoje.quantidade + resFind.quantidadeTotal,
      }
    );
    console.log(resUpdateQuantidade);
    console.log(quantidadeDePedidosLiberadosHoje.quantidade);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/pedidos", (req, res) => {
    try {
        Pedido.deleteOne({ _id: req.body._id }, (err) => {
          if (err) return handleError(err);
        });
        res.send("success");
      } catch (error) {
        res.send(error);
      }
});

module.exports = router;