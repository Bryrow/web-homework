import React from 'react'
import { arrayOf, string, shape } from 'prop-types'
import { css } from '@emotion/core'
// import { useMutation, useQuery } from '@apollo/client'
// import { GET_TRANSACTIONS } from '../../gql/transactions'
// import { GET_MERCHANTS, DELETE_MERCHANT } from '../../gql/merchants'

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
  // const { data: transactionsData } = useQuery(GET_TRANSACTIONS)
  // const [deleteMerchant] = useMutation(DELETE_Merchant, { refetchQueries: [{ query: GET_MERCHANTS }] })

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
                {/* TODO: Add logic for only showing the delete button if the merchant is not attached to a transaction */}
                {/* <td><button disabled={transactionsData && transactionsData.transactions.find((tx) => tx.merchantId === id)} onClick={() => { deleteMerchant({ variables: { id } }) }}>Delete</button></td> */}
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
