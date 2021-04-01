mongoose = require('mongoose')

const EsquemaLoja = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectID,
    idProprietario: String,
    idPessoa: String,
    chaveIdentificacao: [
      {
        chave: String,
        idEndereco: String,
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
        ]
      }
    ],
});

module.exports = mongoose.model('Loja', EsquemaLoja);
