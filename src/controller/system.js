
const system = require('../services/system')

exports.indexHeader = async function (req, res) {
  res.json(await system.indexHeader(res.locals.mysql))
}

exports.indexFooter = async function (req, res) {
  res.json(await system.indexFooter(res.locals.mysql))
}

exports.createHeader = async function (req, res) {
  const result = await system.createHeader(res.locals.mysql, req.body)
  res.json(result)
}

exports.createFooter = async function (req, res) {
  const result = await system.createFooter(res.locals.mysql, req.body)
  res.json(result)
}
