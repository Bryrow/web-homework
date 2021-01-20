import React from 'react'
import { arrayOf, string, shape } from 'prop-types'
import { css } from '@emotion/core'
// import { useMutation, useQuery } from '@apollo/client'
// import { GET_TRANSACTIONS } from '../../gql/transactions'
// import { GET_USERS, DELETE_USER } from '../../gql/users'

const styles = css`
 .header {
   font-weight: bold;
 }
 .table-data-padding {
   padding-right: 24px;
 }
`

const makeDataTestId = (userId, fieldName) => `user-${userId}-${fieldName}`

export function UserTable ({ data }) {
  // const { data: transactionsData } = useQuery(GET_TRANSACTIONS)
  // const [deleteUser] = useMutation(DELETE_USER, { refetchQueries: [{ query: GET_USERS }] })

  return (
    <table css={styles}>
      <tbody>
        <tr className='header'>
          <td className='table-data-padding'>First Name</td>
          <td className='table-data-padding'>Last Name</td>
          <td className='table-data-padding'>Date of Birth</td>
        </tr>
        {
          data.map(user => {
            const { id, firstName, lastName, dob } = user
            return (
              <tr data-testid={`user-${id}`} key={`user-${id}`}>
                <td data-testid={makeDataTestId(id, 'firstName')}>{firstName}</td>
                <td data-testid={makeDataTestId(id, 'lastName')}>{lastName}</td>
                <td data-testid={makeDataTestId(id, 'dob')}>{dob}</td>
                {/* TODO: Add logic for only showing the delete button if the user is not attached to a transaction */}
                {/* <td><button disabled={transactionsData && transactionsData.transactions.find((tx) => tx.userId === id)} onClick={() => { deleteUser({ variables: { id } }) }}>Delete</button></td> */}
              </tr>
            )
          })
        }
      </tbody>
    </table>

  )
}

UserTable.propTypes = {
  data: arrayOf(shape({
    id: string,
    firstName: string,
    lastName: string,
    dob: string
  }))
}
