import React from 'react'
import { arrayOf, string, bool, number, shape } from 'prop-types'
import { css } from '@emotion/core'

const styles = css`
 .header {
   font-weight: bold;
 }
`

const makeDataTestId = (transactionId, fieldName) => `transaction-${transactionId}-${fieldName}`

/**
 * This function divides the amountInCents by 100 but doing it with exponents to avoid floating point mistakes.
 * @function timesAmountCentsByHundred
 * @param  {string} amountInCents amount in cents
 * @return {number} The amountInCents divided by 100
 */
function timesAmountCentsByHundred (amountInCents) {
  // e-2: e(represents a power of 10), this is done to avoid random floating point mistakes
  const amountInDollars = parseFloat(amountInCents + 'e-2')
  return amountInDollars
}

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
                <td data-testid={makeDataTestId(id, 'amount')}>{timesAmountCentsByHundred(amount).toLocaleString(i18n ? 'ja-JP' : 'en-US', { style: 'currency', currency: i18n ? 'JPY' : 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</td>
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
