
const axios = require('axios')

// Or like this...
const customInstance = axios.create({
  baseURL: 'http://localhost:5001/api',
  headers: { Accept: 'application/json' }
})

exports.home = async function (req, res) {
  let clients
  try {
    const result = await customInstance.get('/')
    clients = result.data
  } catch (error) {
    clients = {}
    console.error(error)
  }
  res.render('pages/home', { clients: clients.message, total: clients.total })
}

exports.footer = async function (req, res) {
  res.render('pages/infoFooter')
}

exports.header = async function (req, res) {
  res.render('pages/infoHeader')
}

exports.listar = async function (req, res) {
  const data = {}
  data.idClient = req.query.id
  try {
    const result = await customInstance.get(`/pedOrc?id=${data.idClient}`)
    data.orcPeds = result.data.message.itemsOrcPeds ? result.data.message.itemsOrcPeds : {}
    data.lastOrcPed = result.data.message.lastOrcPed ? result.data.message.lastOrcPed : {}
    data.lastItemsOrcPed = result.data.message.lastItemsOrcPed ? result.data.message.lastItemsOrcPed : {}
  } catch (error) {
    console.error(error)
  }
  if (data.orcPeds) {
    data.count = Object.keys(data.orcPeds).length
  } else {
    data.count = 0
  }

  res.render('pages/listarOrcPed', { data })
}

exports.listItemOrcPed = async function (req, res) {
  const { id, type } = req.query
  res.render('pages/listarItemOrcPed', { id, type })
}

exports.editItemOrcPed = async function (req, res) {
  // action === create id === OrcPed
  // action === editar id === ItemOrcPed
  const { id, type, action } = req.query
  let title = 'Cadastrar Item'
  if (action === 'editar') {
    title = 'Editar Item'
    // o id é o do ItemOrcPed
  } else {
    // o id é o do OrcPed
  }
  const data = {}
  data.id = id
  data.type = type
  data.action = action
  data.title = title
  try {
    const result = await customInstance.get(`/pedOrc/item?id=${id}`)
    data.items = result.data
  //  data.listItemsOrcPed = result.data.message.lastItemsOrcPed ? result.data.message.lastItemsOrcPed : {}
  } catch (error) {
    console.error(error)
  }

  res.render('pages/editItemOrcPed', { data })
}

exports.editOrcPed = async function (req, res) {
  // action === create id === PF/PJ
  // action === editar id === OrcPed
  const { id, type, action, last, numero, validade, obs, endereco, idClient } = req.query
  let title = `Cadastro ${type}`
  if (action === 'editar') {
    title = `Editar ${type}`
    // o id é o do OrcPed
  }
  res.render('pages/editOrcPed', { title, type, last, id, action, numero, validade, obs, endereco, idClient })
}

exports.pfpj = async function (req, res) {
  const { email } = req.query
  const data = { title: '' }
  try {
    const result = await customInstance.get(`?email=${email}`)
    data.client = result.data.message[0] ? result.data.message[0] : {}
  } catch (error) {
    console.error(error)
  }
  data.title = (email && data.client.nome) ? `Cliente: ${data.client.nome}` : 'Cadastro PF/PJ'
  res.render('pages/pf_pj', { data })
}
