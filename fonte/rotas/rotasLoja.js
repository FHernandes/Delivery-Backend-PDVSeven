const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Loja = require('../esquemas/loja');

// get para /lojas
router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Get request to /products'
    });
});

// get lojas por id interno do Mongo
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Loja.findOne({_id: id})
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

// get lojas por nome
router.get('/CarregarPorNome/:nome', (req, res) => {
    const nome = req.params.nome;
    Loja.findOne({nome: nome})
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

// post para /lojas
router.post('/', (req, res) => {
   const loja = new Loja({
        _id: new mongoose.Types.ObjectId(),
        id_externo: req.body.id_externo,
        nome: req.body.nome,
        cep: req.body.cep,
        rua: req.body.rua,
        numero: req.body.numero,
        cidade: req.body.cidade,
        estado: req.body.estado,
        localizacao: req.body.localizacao,
        categorias: req.body.categorias
    });

    loja
        .save()
        .then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));

    res.status(200).json({
        message: 'Post request to /products'
    });
});

module.exports = router;