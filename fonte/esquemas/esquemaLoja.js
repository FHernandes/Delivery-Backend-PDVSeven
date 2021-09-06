mongoose = require('mongoose')

const EsquemaLoja = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectID,
    idProprietario: String,
    idPessoa: String,
    lojaDisponivel: Boolean,
    chaveIdentificacao: [String],
    chaveFormatada: [String],
    telefones: [String],
    entregaBairro: [
      {
        bairro: String,
        valor: Number,
        areaRecusada: Boolean
      }
    ],
    entregaArea: [
      {
        distancia: Number,
        valor: Number
      }
    ],
    links: [
      {
        nome: String,
        url: String
      }
    ]
});

module.exports = mongoose.model('Loja', EsquemaLoja);
