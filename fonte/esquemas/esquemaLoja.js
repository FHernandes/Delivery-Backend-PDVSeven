mongoose = require('mongoose')

const EsquemaLoja = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectID,
    idProprietario: String,
    idPessoa: String,
    chaveIdentificacao: [String],
    telefones: [
      {
        idTelefone: String
      }
    ],
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
    linkFacebook: String,
    linkInstagram: String
});

module.exports = mongoose.model('Loja', EsquemaLoja);
