const Generic = require('../db/dao/generic')

const success = 'Ação realizada com sucesso!!'
const ops = 'Ops, por favor tente mais tarde...'

exports.index = async function (conn, id) {
  const generic = new Generic(conn)
  return await generic.getAllItemsOrcPedThisIdOrcPed(id)
}

exports.create = async function (conn, data, id) {
  const generic = new Generic(conn)
  // existe este pedido/orcamento para criar este item?
  if (!await checkThisOrcPed(conn, id)) return _errors(true, 'ops,este pedido/orcamento não existe')
  const saveRes = await generic.createOrcPedItem(data, id)
  if (saveRes && saveRes.affectedRows === 1) {
    return _errors(false, success)
  }
  return _errors(true, ops)
}

exports.update = async function (conn, data, id) {
  const generic = new Generic(conn)
  const resut = await generic.checkByIdInOrcPedItem(id)
  if (resut.length >= 1) {
    const saveRes = await generic.updateOrcPedItem(data, id)

    if (saveRes && saveRes.affectedRows === 1) {
      return _errors(false, success)
    }
  } else {
    return _errors(true, `Ops, item num:: ${id} não inexistente`)
  }
}
exports.delete = async function (conn, id) {
  const generic = new Generic(conn)
  const resut = await generic.checkByIdInOrcPedItem(id)
  if (resut.length >= 1) {
    const saveRes = await generic.deleteOrcPedItem(id)
    if (saveRes && saveRes.affectedRows === 1) {
      return _errors(false, success)
    }
  } else {
    return _errors(true, ops)
  }
}
async function checkThisOrcPed (conn, id) {
  const generic = new Generic(conn)
  const resut = await generic.checkByIdInOrcPed(id)
  return (resut.length >= 1)
}
function _errors (erro, message) {
  return { erro, message }
}
