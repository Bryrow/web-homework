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

const makeDataTestId = (merchantId, fieldName) => `merchant-${merchantId}-${fieldName}`

export function MerchantTable ({ data }) {
  return (
    <table css={styles}>
      <tbody>
        <tr className='header'>
          <td className='table-data-padding'>Name</td>
          <td className='table-data-padding'>Description</td>
        </tr>
        {
          data.map(merchant => {
            const { id, name, description } = merchant
            return (
              <tr data-testid={`merchant-${id}`} key={`merchant-${id}`}>
                <td data-testid={makeDataTestId(id, 'name')}>{name}</td>
                <td data-testid={makeDataTestId(id, 'description')}>{description}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>

  )
}

MerchantTable.propTypes = {
  data: arrayOf(shape({
    id: string,
    name: string,
    description: string
  }))
}
