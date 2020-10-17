const Generic = require('../db/dao/generic')

const success = 'Ação realizada com sucesso'
const opss = 'ops, tente mais tarde'

exports.indexHeader = async function (conn) {
  const generic = new Generic(conn)
  const result = await generic.getHeader()
  return _errors(true, result)
}

exports.indexFooter = async function (conn) {
  const generic = new Generic(conn)
  const result = await generic.getFooter()
  return _errors(true, result)
}

exports.createHeader = async function (conn, data) {
  const generic = new Generic(conn)
  const resut = await generic.checkHeaderByEmail(data.email)

  let saveRes = null
  if (resut.length >= 1) {
    saveRes = await generic.updateHeader(data, resut[0].idheader)
  } else {
    saveRes = await generic.createHeader(data)
  }
  if (saveRes && saveRes.affectedRows === 1) {
    return _errors(false, success)
  }
  return _errors(true, opss)
}

exports.createFooter = async function (conn, data) {
  const generic = new Generic(conn)
  const resut = await generic.checkFooterByEmail(data.email)

  let saveRes = null
  if (resut.length >= 1) {
    saveRes = await generic.updateFooter(data, resut[0].idfooter)
  } else {
    saveRes = await generic.createFooter(data)
  }
  if (saveRes && saveRes.affectedRows === 1) {
    return _errors(false, success)
  }
  return _errors(true, opss)
}

exports.update = async function (conn, data) {
  const generic = new Generic(conn)
  const resut = await generic.checkByEmail(data.email)

  if (resut.length >= 1) {
    const saveRes = await generic.updateGeneric(data)
    if (saveRes && saveRes.affectedRows === 1) {
      return _errors(false, success)
    }
  } else {
    return _errors(true, opss)
  }
}

exports.delete = async function (conn, id) {
  const generic = new Generic(conn)
  const saveRes = await generic.deleteGeneric(id)
  if (saveRes && saveRes.affectedRows === 1) {
    return _errors(false, 'ação realizada com sucesso')
  } else {
    return _errors(true, 'ops, tente mais tarde')
  }
}

function _errors (erro, message, total) {
  return { erro, message, total }
}
