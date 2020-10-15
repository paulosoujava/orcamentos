const express = require('express')
const router = express.Router()
const generic = require('../controller/generic')
const pedOrc = require('../controller/pedOrc')
const itemPedOrc = require('../controller/pedOrcItem')

// /api or /api/?email=paulo@gmail.com
router.get('/', generic.index)
router.post('/create', generic.create)
router.put('/update', generic.update)
router.delete('/delete/:id', generic.delete)

/**
 * {
    "nome" : "Paulo Oliveira",
    "email" : "paulo@gmail.com",
    "telefone" : "48 996297813",
    "cidade" : "Florianópolis",
    "uf" : "SC",
    "obs" : "",
    "endereco" : "AV. joreg lacerda 2956 Fundos, Costeira do Pirajubaé cep 88047-001",
    "cpfCnpj":"123.123.+-56"
}
 */

// pedORc
router.post('/create/pedOrc/:id', pedOrc.create)
router.put('/update/pedOrc/:id', pedOrc.update)
router.delete('/delete/pedOrc/:id', pedOrc.delete)

/**
     {
      "idOrcPed": "006",
        "tipo": "pedido",
        "localEntrega" : "UPDATE 6" ,
        "validade": "20/10/2020",
        "criacao" : "10/10/2020",
        "quantidadeItens" : "0",
        "valorTotal": "00.00",
        "obs" : "verificar estoque",
        "numeroDoPedido": "1",
        "situacao": "criado"
      }
 */

// itens pedOrc
router.post('/create/pedOrc/item/:id', itemPedOrc.create)
router.put('/update/pedOrc/item/:id', itemPedOrc.update)
router.delete('/delete/pedOrc/item/:id', itemPedOrc.delete)

/**
 * {
      "descricao" : "UPDATE 5" ,
      "valorUnitario": "5.00",
      "quantidade" : "10",
      "valorTotal" : "15.00",
      "obs" : "verificar estoque"
   }
 */

module.exports = router
