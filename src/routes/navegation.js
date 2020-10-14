const express = require('express')
const router = express.Router()
const navegation = require('../controller/navegation')

router.get('/', navegation.home)
router.get('/pfpj', navegation.pfpj)
router.get('/listar', navegation.listar)
router.get('/editOrcPed', navegation.editOrcPed)
router.get('/editItemOrcPed', navegation.editItemOrcPed)
router.get('/listItemOrcPed', navegation.listItemOrcPed)

router.get('/header', navegation.header)
router.get('/footer', navegation.footer)

module.exports = router
