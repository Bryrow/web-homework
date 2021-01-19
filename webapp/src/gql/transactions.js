import gql from 'graphql-tag'

export const GET_TRANSACTIONS = gql`
  {
    transactions {
      id
      amount
      description
      credit
      debit
    }
  }
`

export const DELETE_TRANSACTION = gql`
  mutation deleteTransaction($id: ID!) {
      deleteTransaction(id: $id) {
        id
      }
    }
`
