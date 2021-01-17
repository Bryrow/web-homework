import React from 'react'
import { arrayOf, string, bool, number, shape } from 'prop-types'
import { css } from '@emotion/core'

const styles = css`
 .header {
   font-weight: bold;
 }
`

const makeDataTestId = (transactionId, fieldName) => `transaction-${transactionId}-${fieldName}`

export function TxTable ({ data, i18n }) {
  return (
    <table css={styles}>
      <tbody>
        <tr className='header'>
          <td>ID</td>
          <td>{i18n ? 'ユーザーID' : 'User ID'}</td>
          <td>{i18n ? '説明' : 'Description'}</td>
          <td>{i18n ? '販売者ID' : 'Merchant ID'}</td>
          <td>{i18n ? 'デビット' : 'Debit'}</td>
          <td>{i18n ? 'クレジット' : 'Credit'}</td>
          <td>{i18n ? '量' : 'Amount'}</td>
        </tr>
        {
          data.map(tx => {
            const { id, user_id: userId, description, merchant_id: merchantId, debit, credit, amount } = tx
            return (
              <tr data-testid={`transaction-${id}`} key={`transaction-${id}`}>
                <td data-testid={makeDataTestId(id, 'id')}>{id}</td>
                <td data-testid={makeDataTestId(id, 'userId')}>{userId}</td>
                <td data-testid={makeDataTestId(id, 'description')}>{description}</td>
                <td data-testid={makeDataTestId(id, 'merchant')}>{merchantId}</td>
                <td data-testid={makeDataTestId(id, 'debit')}>{debit}</td>
                <td data-testid={makeDataTestId(id, 'credit')}>{credit}</td>
                <td data-testid={makeDataTestId(id, 'amount')}>{amount}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>

  )
}

TxTable.propTypes = {
  data: arrayOf(shape({
    id: string,
    user_id: string,
    description: string,
    merchant_id: string,
    debit: bool,
    credit: bool,
    amount: number
  })),
  i18n: Boolean
}
