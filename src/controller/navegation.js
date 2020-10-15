
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
  res.render('pages/home', { clients: clients.message })
}

exports.footer = async function (req, res) {
  res.render('pages/infoFooter')
}

exports.header = async function (req, res) {
  res.render('pages/infoHeader')
}

exports.listar = async function (req, res) {
  const data = {}
  try {
    const result = await customInstance.get(`/pedOrc?id=${req.query.id}`)
    console.log(result.data)
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
  res.render('pages/editItemOrcPed', { title, type })
}

exports.editOrcPed = async function (req, res) {
  // action === create id === PF/PJ
  // action === editar id === OrcPed
  const { id, type, action } = req.query
  let title = `Cadastro ${type}`
  if (action === 'editar') {
    title = `Editar ${type}`
    // o id é o do OrcPed
  } else {
    // o id é o do Generic
  }
  res.render('pages/editOrcPed', { title, type })
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
  console.log(data)
  data.title = (email && data.client.nome) ? `Cliente: ${data.client.nome}` : 'Cadastro PF/PJ'
  res.render('pages/pf_pj', { data })
}
