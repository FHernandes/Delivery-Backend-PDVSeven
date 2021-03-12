mongoose = require('mongoose')

const EsquemaLoja = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  id_externo: String,
  nome: String,
  cep: String,
  rua: String,
  numero: String,
  cidade: String,
  estado: String,
  localizacao: String,
  categorias:
    [{
      nome: String,
      produtos: [
        {
          id_externo: String,
          nome: String,
          valor: Number,
          paineis_modificacao: [
            {
              id_externo: String,
              nome: String,
              minimo: Number,
              maximo: Number,
              produtos:[
                {
                  nome: String,
                  valor: Number
                }]
            }]
        }]
    }]
});

module.exports = mongoose.model('Loja', EsquemaLoja);
