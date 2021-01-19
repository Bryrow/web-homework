import gql from 'graphql-tag'

export const GET_USERS = gql`
  {
    users {
      id
      firstName
      lastName
      dob
    }
  }
`

export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`
