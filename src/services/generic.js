const Generic = require('../db/dao/generic')

exports.index = async function (conn) {
  const generic = new Generic(conn)
  const resut = await generic.getAll()
  return _errors(false, resut)
}

exports.indexOne = async function (conn, email) {
  const generic = new Generic(conn)
  const resut = await generic.getOne(email)
  return _errors(false, resut)
}

exports.create = async function (conn, data) {
  const generic = new Generic(conn)
  const resut = await generic.checkByEmail(data.email)

  if (resut.length >= 1) {
    return _errors(true, 'ops, usuários existente')
  } else {
    const saveRes = await generic.createGeneric(data)
    if (saveRes && saveRes.affectedRows === 1) {
      return _errors(false, 'ação realizada com sucesso')
    }
    return _errors(true, 'ops, tente mais tarde')
  }
}

exports.update = async function (conn, data) {
  const generic = new Generic(conn)
  const resut = await generic.checkByEmail(data.email)

  if (resut.length >= 1) {
    const saveRes = await generic.updateGeneric(data)
    if (saveRes && saveRes.affectedRows === 1) {
      return _errors(false, 'ação realizada com sucesso')
    }
  } else {
    return _errors(true, 'ops, usuário inexistente')
  }
}

exports.delete = async function (conn, data) {
  const generic = new Generic(conn)
  const resut = await generic.checkByEmail(data.email)

  if (resut.length >= 1) {
    const saveRes = await generic.deleteGeneric(data)
    if (saveRes && saveRes.affectedRows === 1) {
      return _errors(false, 'ação realizada com sucesso')
    }
  } else {
    return _errors(true, 'ops, usuário inexistente')
  }
}

function _errors (erro, message) {
  return { erro, message }
}
