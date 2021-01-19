import gql from 'graphql-tag'

export const GET_MERCHANTS = gql`
  {
    merchants {
      id
      description
      name
    }
  }
`
