import React from 'react'
import { arrayOf, string, bool, number, shape } from 'prop-types'
import { css } from '@emotion/core'
import { useMutation } from '@apollo/client'
import { GET_TRANSACTIONS, DELETE_TRANSACTION } from '../../gql/transactions'

const styles = css`
 .header {
   font-weight: bold;
 }
`

const makeDataTestId = (transactionId, fieldName) => `transaction-${transactionId}-${fieldName}`

/**
 * Converts the amount to roman numerals
 * @function convertToRoman
 * @param  {number} arabicNumber - The amount that is going to be converted to Roman Numerals
 * @return {string} Roman numeral value of the amount
 */
function convertToRoman (arabicNumber) {
  const romanArabicValues = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 }
  let romanNumerals = ''
  for (const i in romanArabicValues) {
    while (arabicNumber >= romanArabicValues[i]) {
      romanNumerals += i
      arabicNumber -= romanArabicValues[i]
    }
  }
  return romanNumerals
}

/**
 * Divides the amountInCents by 100 by using exponents to avoid floating point mistakes.
 * @function timesAmountCentsByHundred
 * @param  {number} amountInCents - amount in cents
 * @return {number} The amountInCents divided by 100
 */
function timesAmountCentsByHundred (amountInCents) {
  // e-2: e(represents a power of 10), this is done to avoid random floating point mistakes
  const amountInDollars = parseFloat(amountInCents + 'e-2')
  return amountInDollars
}

function checkForRomanNumerals (amount, isRoman, i18n) {
  const amountInDollars = timesAmountCentsByHundred(amount)
  if (isRoman) {
    return convertToRoman(amountInDollars)
  } else {
    return amountInDollars.toLocaleString(i18n ? 'ja-JP' : 'en-US', { style: 'currency', currency: i18n ? 'JPY' : 'USD' })
  }
}

export function TxTable ({ data, i18n, isRoman }) {
  const [deleteTransaction] = useMutation(DELETE_TRANSACTION, { refetchQueries: [{ query: GET_TRANSACTIONS }] })

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
                <td data-testid={makeDataTestId(id, 'amount')}>{checkForRomanNumerals(amount, isRoman, i18n)}</td>
                <td><button onClick={() => { deleteTransaction({ variables: { id } }) }}>Delete</button></td>
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
  i18n: bool,
  isRoman: bool
}
