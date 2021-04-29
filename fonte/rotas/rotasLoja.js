const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const Loja = require('../esquemas/esquemaLoja');

// get para /lojas
router.get('/', (req, res) => {
    res.status(300).json({
        message: "It works!"
    });
});

// get lojas por chave
router.get('/carregar/:chave', (req, res) => {
    const chave = req.params.chave;
    Loja.findOne({chaveIdentificacao: {$elemMatch: {chave: chave}}})
        .exec()
        .then(doc => {
            console.log("Do banco de dados:", doc);

            let resultado = { };
            resultado["_id"] = doc._id;
            resultado["idProprietario"] = doc.idProprietario;
            resultado["idPessoa"] = doc.idPessoa;

            let chaveIdentificacao;
            for(i = 0; i < doc.chaveIdentificacao.length; i++){
                if (doc.chaveIdentificacao[i].chave === chave){
                    chaveIdentificacao = doc.chaveIdentificacao[i];
                    resultado["chaveIdentificacao"] = chaveIdentificacao;
                    break;
                }
            }
            
            res.status(200).json(resultado);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

// Listar lojas
router.get('/listar/:idProprietario', (req, res) => {
    const idProprietario = req.params.idProprietario;
    Loja.find({idProprietario: idProprietario})
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

// post para lojas/adicionar
router.post('/adicionar', async (req, res) => {

    const chave = req.body.chaveIdentificacao[0].chave;
    const chaveFormatada = chave.split(' ').join('-');

    let LojaExiste = await Loja.findOne({chaveIdentificacao: {$elemMatch: {chave: chaveFormatada}}})
        .exec()
        .then()
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });

    if(LojaExiste === null){

        let chavesArray = req.body.chaveIdentificacao;
        const idProprietario = uuidv4();

        for(i = 0; i < chavesArray.length; i++){
            //chavesFormatadas.push(chaves[i].split(' ').join('-'));
            chavesArray[i].chave = chavesArray[i].chave.split(' ').join('-');
        }

        const loja = new Loja({
            _id: mongoose.Types.ObjectId(),
            idProprietario: idProprietario,
            idPessoa: req.body.idPessoa,
            chaveIdentificacao: chavesArray,
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
    }
    else{
        res.status(500).json({
            erro: "Erro: Recurso já foi armazenado no servidor."
        })
    }
});

/*router.patch('/alterar/:id/:chave', (req, res) => {
    const id = req.params.id;
    const chave = req.params.chave; 
    const alteracoes = {};

    for(const [ch, val] of Object.entries(req.body)){
        alteracoes[ch] = val;
    }

    Loja.update(
        {_id: id}, 
        { $set: alteracoes},
        {arrayFilters: [{chaveIdentificacao.chave: chave }]}
    )
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

// alterar loja
/*
router.patch('/alterar/:id/:chave', (req, res) => {
    const id = req.params.id;
    const chave = req.params.chave; 
    const alteracoes = {};

    for(const [ch, val] of Object.entries(req.body)){
        alteracoes[ch] = val;
    }

    Loja.update(
        {_id: id}, 
        { $set: alteracoes},
        {arrayFilters: [{chave: chave }]}
    )
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
*/

module.exports = router;