
const pedOrcItem = require('../services/pedOrcItem')

exports.index = async function (req, res) {
  const result = await pedOrcItem.index(res.locals.mysql, req.query.id)
  res.json(result)
}

exports.create = async function (req, res) {
  const result = await pedOrcItem.create(res.locals.mysql, req.body, req.params.id)
  res.json(result)
}

exports.update = async function (req, res) {
  const result = await pedOrcItem.update(res.locals.mysql, req.body, req.params.id)
  res.json(result)
}

exports.delete = async function (req, res) {
  const result = await pedOrcItem.delete(res.locals.mysql, req.params.id)
  res.json(result)
}
