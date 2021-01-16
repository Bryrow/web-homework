const { model } = require('../data-models/User')
const { packageModel } = require('./utils.js')

async function find (criteria) {
  const query = Object.keys(criteria).length
    ? model.find(criteria)
    : model.find()

  const users = await query.exec()

  return packageModel(users)
}

async function findOne (id) {
  const query = model.findById(id)
  const user = await query.exec()

  return packageModel(user)[0] || null
}

module.exports = {
  find,
  findOne
}
