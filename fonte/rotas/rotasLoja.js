const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Loja = require('../esquemas/esquemaLoja');

// get para /lojas
router.get('/', (req, res) => {
    res.status(300).json({
        message: "It works!"
    });
});

// get lojas por chave
router.get('/carregar/:chaveIdentificacao', (req, res) => {
    const chaveIdentificacao = req.params.chaveIdentificacao;
    Loja.findOne({chaveIdentificacao: chaveIdentificacao})
        .exec()
        .then(doc => {
            console.log("Do banco de dados:", doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

// Listar lojas
router.get('/listar/:chaveIdentificacao', (req, res) => {
    const chaveIdentificacao = req.params.chaveIdentificacao;
    Loja.find({chaveIdentificacao: chaveIdentificacao})
        .exec()
        .then(doc => {
            console.log("Do banco de dados:", doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

// post para
router.post('/adicionar', (req, res) => {
   const loja = new Loja({
        _id: mongoose.Types.ObjectId(),
        idProprietario: req.body.idProprietario,
        idPessoa: req.body.idPessoa,
        chaveIdentificacao: req.body.chaveIdentificacao,
        idEndereco: req.body.idEndereco,
        telefones: req.body.telefones,
        entregaBairro: req.body.entregaBairro,
        entregaArea: req.body.entregaArea
    });

    loja
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

// alterar loja
router.patch('/alterar/:chaveIdentificacao', (req, res) => {
    const chaveIdentificacao = req.params.chaveIdentificacao; 
    const alteracoes = {};

    for(const [chave, valor] of Object.entries(req.body)){
        alteracoes[chave] = valor;
    }

    Loja.update({chaveIdentificacao: chaveIdentificacao}, { $set: alteracoes})
    .exec()
        .then(doc => {
            console.log("Do banco de dados:", doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
})

module.exports = router;