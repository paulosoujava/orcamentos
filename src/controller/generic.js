
const generic = require('../services/generic')

exports.index = async function (req, res) {
  let result = null
  if (req.query && req.query.email !== undefined) {
    result = await generic.indexOne(res.locals.mysql, req.query.email)
  } else {
    result = await generic.index(res.locals.mysql)
  }
  res.json(result)
}

exports.create = async function (req, res) {
  console.log(req.body)
  const result = await generic.create(res.locals.mysql, req.body)
  res.json(result)
}

exports.update = async function (req, res) {
  const result = await generic.update(res.locals.mysql, req.body)
  res.json(result)
}

exports.delete = async function (req, res) {
  const result = await generic.delete(res.locals.mysql, req.params.id)
  res.json(result)
}
