const Generic = require('../db/dao/generic')

exports.index = async function (conn, id) {
  const generic = new Generic(conn)
  const result = {}
  result.itemsOrcPeds = await generic.getAllOcrPed(id)
  const last = await generic.getLastOcrPed()
  const lastItems = await generic.getLastItemsOcrPed(id)
  console.log(last[0].idOrcPed)
  result.lastOrcPed = last[0]
  result.lastItemsOrcPed = lastItems
  return _errors(false, result)
}

exports.create = async function (conn, data, id) {
  const generic = new Generic(conn)
  if (!await checkThisGeneric(conn, id)) return _errors(true, 'ops,este usuário não existe')
  if (await checkThisNumberOrdPed(conn, data.idOrcPed)) return _errors(true, 'ops, já existe um pedido/orcamento com este número')
  const saveRes = await generic.createOrcPed(data, id)

  if (saveRes && saveRes.affectedRows === 1) {
    return _errors(false, 'ação realizada com sucesso')
  }
  return _errors(true, 'ops, tente mais tarde')
}

exports.update = async function (conn, data, id) {
  const generic = new Generic(conn)
  const resut = await generic.checkByIdInOrcPed(id)

  if (resut.length >= 1) {
    const saveRes = await generic.updateOrcPed(data, id)
    if (saveRes && saveRes.affectedRows === 1) {
      return _errors(false, 'ação realizada com sucesso')
    }
  } else {
    return _errors(true, `ops, pedido/orcamento num:: ${id} tipo:: ${data.tipo} criado em::${data.criacao} não encontrado`)
  }
}
exports.delete = async function (conn, data, id) {
  const generic = new Generic(conn)
  const resut = await generic.checkByIdInOrcPed(id)
  console.log(resut.length)
  if (resut.length >= 1) {
    const saveRes = await generic.deleteOrcPed(id)
    if (saveRes && saveRes.affectedRows === 1) {
      return _errors(false, 'ação realizada com sucesso')
    }
  } else {
    return _errors(true, `ops, pedido/orcamento num:: ${id} tipo:: ${data.tipo} criado em::${data.criacao} não encontrado`)
  }
}

async function checkThisGeneric (conn, id) {
  const generic = new Generic(conn)
  const resut = await generic.checkById(id)
  console.log(resut.length)
  return (resut.length >= 1)
}

async function checkThisNumberOrdPed (conn, id) {
  const generic = new Generic(conn)
  const resut = await generic.checkByIdInOrcPed(id)
  console.log(resut.length)
  return (resut.length >= 1)
}

function _errors (erro, message) {
  return { erro, message }
}
