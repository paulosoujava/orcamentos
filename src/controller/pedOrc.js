
const pedOrc = require('../services/pedOrc')

exports.create = async function (req, res) {
  const result = await pedOrc.create(res.locals.mysql, req.body, req.params.id)
  res.json(result)
}

exports.update = async function (req, res) {
  const result = await pedOrc.update(res.locals.mysql, req.body, req.params.id)
  res.json(result)
}

exports.delete = async function (req, res) {
  const result = await pedOrc.delete(res.locals.mysql, req.body, req.params.id)
  res.json(result)
}
