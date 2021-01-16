const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLFloat } = graphql
const { TransactionModel } = require('../data-models/Transaction')
const TransactionType = require('./transaction-type')
const { UserModel } = require('../data-models/User')
const UserType = require('./user-type')

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTransaction: {
      type: TransactionType,
      args: {
        user_id: { type: GraphQLString },
        description: { type: GraphQLString },
        merchant_id: { type: GraphQLString },
        debit: { type: GraphQLBoolean },
        credit: { type: GraphQLBoolean },
        amount: { type: GraphQLFloat }
      },
      /* eslint-disable-next-line camelcase */
      resolve (parentValue, { user_id, description, merchant_id, debit, credit, amount }) {
        return (new TransactionModel({ user_id, description, merchant_id, debit, credit, amount })).save()
      }
    },
    addUser: {
      type: UserType,
      args: {
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        dob: { type: GraphQLString }
      },
      /* eslint-disable-next-line camelcase */
      resolve (parentValue, { id, firstName, lastName, dob }) {
        return (new UserModel({ id, firstName, lastName, dob })).save()
      }
    },
    deleteUserById: {
      type: UserType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: (value, { id }) => {
        return UserModel.removeUser(id)
      }
    }
  }
})

module.exports = mutation
