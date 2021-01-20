import gql from 'graphql-tag'

export const GET_TRANSACTIONS = gql`
  {
    transactions {
      id
      amount
      description
      credit
      debit
      user {
        id
        firstName
        lastName
      }
      merchant {
        id
        name
      }
    }
  }
`

export const GET_SIMPLE_TRANSACTIONS = gql`
  {
    transactions {
      id
      amount
      description
      credit
      debit
      userId
      merchantId
    }
  }
`

export const CREATE_TRANSACTION = gql`
  mutation createTransaction($amount: Int!, $credit: Boolean!, $debit: Boolean!, $description: String!, $merchantId: ID!, $userId: ID!) {
  createTransaction(amount: $amount, credit: $credit, debit: $debit, description: $description, merchantId: $merchantId, userId: $userId) {
    amount
    credit
    debit
    description
    id
    merchantId
    userId
  }
}
`

export const UPDATE_TRANSACTION = gql`
  mutation updateTransaction($id: ID!, $amount: Int!, $credit: Boolean!, $debit: Boolean!, $description: String!, $merchantId: ID!, $userId: ID!) {
    updateTransaction(id: $id, amount: $amount, credit: $credit, debit: $debit, description: $description, merchantId: $merchantId, userId: $userId) {
      amount
      credit
      debit
      description
      id
      merchantId
      userId
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
