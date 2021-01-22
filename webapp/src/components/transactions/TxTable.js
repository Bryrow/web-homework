import React from 'react'
import { arrayOf, string, bool, number, shape } from 'prop-types'
import { css } from '@emotion/core'
import { useMutation } from '@apollo/client'
import { GET_TRANSACTIONS, DELETE_TRANSACTION } from '../../gql/transactions'
import { Link } from 'react-router-dom'

const styles = css`
 .header {
    font-weight: bold;
 }
 .table-data-padding {
    padding-right: 24px;
 }
 .button {
    align-items: center;
    background-color: #fff;
    border-color: #dbdbdb;
    border-radius: 4px;
    border-width: 1px;
    border: 1px solid transparent;
    color: #363636;
    cursor: pointer;
    display: inline-flex;
    font-size: 1rem;
    height: 2.5em;
    justify-content: center;
    margin-bottom: 0.25rem;
    margin-top: 0.25rem;
    padding-bottom: calc(.5em - 1px);
    padding-left: 1em;
    padding-right: 1em;
    padding-top: calc(.5em - 1px);
    text-align: center;
    text-decoration: none;
    white-space: nowrap;
 }
 .is-delete {
    background-color: #f14668;
    border-color: transparent;
    color: #fff;
 }
`

const linkButtonStyle = css`
  align-items: center;
  background-color: #3298DC;
  border-color: transparent;
  border-radius: 4px;
  border-width: 1px;
  border: 1px solid transparent;
  box-shadow: none;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  font-family: Arial;
  font-size: 1rem;
  height: 1.5em;
  justify-content: center;
  line-height: 1.5;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  margin-bottom: 0.25rem;
  margin-top: 0.25rem;
  padding-bottom: calc(.5em - 1px);
  padding-left: 1em;
  padding-right: 1em;
  padding-top: calc(.5em - 1px);
  position: relative;
  text-align: center;
  text-decoration: none;
  vertical-align: top;
  white-space: nowrap;
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
          <td className='table-data-padding'>{i18n ? 'マーチャント名' : 'Merchant Name'}</td>
          <td className='table-data-padding'>{i18n ? 'ユーザー名' : 'User Name'}</td>
          <td className='table-data-padding'>{i18n ? '説明' : 'Description'}</td>
          <td className='table-data-padding'>{i18n ? '借方または貸方' : 'Debit/Credit'}</td>
          <td className='table-data-padding'>{i18n ? '量' : 'Amount'}</td>
        </tr>
        {
          data.map(tx => {
            const { id, user, description, merchant, debit, amount } = tx
            return (
              <tr data-testid={`transaction-${id}`} key={`transaction-${id}`}>
                <td data-testid={makeDataTestId(id, 'merchant')}>{merchant.name}</td>
                <td data-testid={makeDataTestId(id, 'user')}>{`${user.firstName} ${user.lastName}`}</td>
                <td data-testid={makeDataTestId(id, 'description')}>{description}</td>
                <td data-testid={makeDataTestId(id, 'debit')}>{debit === true ? 'Debit' : 'Credit'}</td>
                <td data-testid={makeDataTestId(id, 'amount')}>{checkForRomanNumerals(amount, isRoman, i18n)}</td>
                <td><Link css={linkButtonStyle} to={`/create-transaction/?txId=${id}`}>{i18n ? '編集' : 'Edit'}</Link></td>
                <td><button className='button is-delete' onClick={() => { deleteTransaction({ variables: { id } }) }}>{i18n ? '削除' : 'Delete'}</button></td>
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
