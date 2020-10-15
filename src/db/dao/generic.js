const puresql = require('puresql')
const path = require('path')
const queries = path.resolve('src/db/queries/queries.sql')
class Generic {
  constructor (connection) {
    this._connection = connection
    this._adapter = puresql.adapters.mysql(this._connection)
    // Load our queries
    this._queries = puresql.loadQueries(queries)
  }

  async createGeneric (data) {
    return this.hasExceptions(this._queries.createGenreic(
      {
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
        cidade: data.cidade,
        uf: data.uf,
        obs: data.obs,
        endereco: data.endereco,
        cpfCnpj: data.cpfCnpj
      }, this._adapter))
  }

  async getAllOcrPed (id) {
    return this.hasExceptions(this._queries.getAllOcrPed({ id }, this._adapter))
  }

  async getLastOcrPed (id) {
    return this.hasExceptions(this._queries.getLastOcrPed({ }, this._adapter))
  }

  async getLastItemsOcrPed (id) {
    return this.hasExceptions(this._queries.getLastItemsOcrPed({ id }, this._adapter))
  }

  async getAll () {
    return this.hasExceptions(this._queries.getAll({ }, this._adapter))
  }

  async getOne (email) {
    return this.hasExceptions(this._queries.getOne({ email }, this._adapter))
  }

  async checkByEmail (email) {
    return this.hasExceptions(this._queries.checkByEmail({ email }, this._adapter))
  }

  async checkById (id) {
    return this.hasExceptions(this._queries.checkById({ id }, this._adapter))
  }

  async updateGeneric (data) {
    return this.hasExceptions(this._queries.updateByEmail(
      {
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
        cidade: data.cidade,
        uf: data.uf,
        obs: data.obs,
        endereco: data.endereco,
        cpfCnpj: data.cpfCnpj
      }, this._adapter))
  }

  async deleteGeneric (id) {
    return this.hasExceptions(this._queries.deleteGeneric({ id }, this._adapter))
  }

  //* ***************** PEDIDOS ORCAMENTOS  *******************/
  async createOrcPed (data, id) {
    console.log(data)
    return this.hasExceptions(this._queries.createOrcPed(
      {
        idOrcPed: data.idOrcPed,
        tipo: data.tipo,
        localEntrega: data.localEntrega ? data.localEntrega : '',
        validade: data.validade ? data.validade : '',
        criacao: data.criacao ? data.criacao : '',
        quantidadeItens: data.quantidadeItens ? data.quantidadeItens : '',
        valorTotal: data.valorTotal ? data.valorTotal : '',
        obs: data.obs ? data.obs : '',
        idGeneric: id,
        situacao: data.situacao ? data.situacao : ''
      }, this._adapter))
  }

  async checkByIdInOrcPed (id) {
    return this.hasExceptions(this._queries.checkByIdInOrcPed({ id }, this._adapter))
  }

  async checkThisNumberOrdPed (id) {
    return this.hasExceptions(this._queries.checkThisNumberOrdPed({ id }, this._adapter))
  }

  async deleteOrcPed (id) {
    return this.hasExceptions(this._queries.deleteOrcPed({ id }, this._adapter))
  }

  async updateOrcPed (data, id) {
    return this.hasExceptions(this._queries.updateOrcPed(
      {
        tipo: data.tipo,
        localEntrega: data.localEntrega ? data.localEntrega : '',
        validade: data.validade ? data.validade : '',
        criacao: data.criacao ? data.criacao : '',
        quantidadeItens: data.quantidadeItens ? data.quantidadeItens : '',
        valorTotal: data.valorTotal ? data.valorTotal : '',
        obs: data.obs ? data.obs : '',
        situacao: data.situacao ? data.situacao : '',
        idOrcPed: data.idOrcPed,
        id
      }, this._adapter))
  }

  //* ***************** ITEM PEDIDOS ORCAMENTOS  *******************/
  async createOrcPedItem (data, id) {
    return this.hasExceptions(this._queries.createOrcPedItem(
      {
        descricao: data.descricao ? data.descricao : '',
        valorUnitario: data.valorUnitario ? data.valorUnitario : '',
        quantidade: data.quantidade ? data.quantidade : '',
        valorTotal: data.valorTotal ? data.valorTotal : '',
        obs: data.obs ? data.obs : '',
        idOrcPed: id
      }, this._adapter))
  }

  async checkByIdInOrcPedItem (id, tipo, criacao) {
    return this.hasExceptions(this._queries.checkByIdInOrcPedItem({ id }, this._adapter))
  }

  async deleteOrcPedItem (id) {
    return this.hasExceptions(this._queries.deleteOrcPedItem({ id }, this._adapter))
  }

  async updateOrcPedItem (data, id) {
    return this.hasExceptions(this._queries.updateOrcPedItem(
      {
        descricao: data.descricao ? data.descricao : '',
        valorUnitario: data.valorUnitario ? data.valorUnitario : '',
        quantidade: data.quantidade ? data.quantidade : '',
        valorTotal: data.valorTotal ? data.valorTotal : '',
        obs: data.obs ? data.obs : '',
        id
      }, this._adapter))
  }

  //* ***************** NUMBER ORCAMENTOS OU PEDIDOS *******************/
  async createNumberOrcPed (data, id) {
    return this.hasExceptions(this._queries.createNumberOrcPed(
      {
        idorcPed: data.tipo,
        newNumber: data.newNumber ? data.newNumber : '',
        oldNumber: data.oldNumber ? data.oldNumber : ''
      }, this._adapter))
  }

  //* ***************** ERROR *******************/
  async hasExceptions (query) {
    try {
      return await query
    } catch (error) {
      return error
    }
  }
}
module.exports = Generic
