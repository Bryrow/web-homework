import React from 'react'
import { arrayOf, string, shape } from 'prop-types'
import { css } from '@emotion/core'

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
