exports.home = async function (req, res) {
  res.render('pages/home')
}

exports.footer = async function (req, res) {
  res.render('pages/infoFooter')
}

exports.header = async function (req, res) {
  res.render('pages/infoHeader')
}

exports.listar = async function (req, res) {
  res.render('pages/listarOrcPed')
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
  const { id } = req.query
  let title = 'Cadastro PF/PJ'
  if (id) {
    title = 'Editar PF/PJ'
  }
  res.render('pages/pf_pj', { title })
}
