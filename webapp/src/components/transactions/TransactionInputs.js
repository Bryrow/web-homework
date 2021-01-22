import React, { useState } from 'react'
import { css } from '@emotion/core'
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_TRANSACTION, GET_SIMPLE_TRANSACTIONS, UPDATE_TRANSACTION } from '../../gql/transactions'
import { GET_MERCHANTS } from '../../gql/merchants'
import { GET_USERS } from '../../gql/users'

const formWrapper = css`
  display:grid;
  grid-row-gap: 8px;
  grid-column-gap: 24px;
  grid-template-columns: 2;
`

const amountStyle = css`
  grid-column: 1;
  grid-row: 1;
`

const inputWidthStyle = css`
  width: 200px;
`

const descriptionStyle = css`
  grid-column: 2;
  grid-row: 1;
`

const merchantStyle = css`
  grid-column: 1;
  grid-row: 2;
`

const userStyle = css`
  grid-column: 2;
  grid-row: 2;
`

const creditDebitStyle = css`
  grid-column: 1 / 4;
  grid-row: 3;
`

const saveButtonGrid = css`
  grid-column: 2;
  grid-row: 3;
`

const buttonStyle = css`
  align-items: flex-end;
  background-color: #48c774;
  border-color: transparent;
  border-radius: 4px;
  border-width: 1px;
  border: 1px solid transparent;
  box-shadow: none;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  font-size: 1rem;
  height: 2.5em;
  justify-content: flex-end;
  line-height: 1.5;
  padding-bottom: calc(.5em - 1px);
  padding-left: 1em;
  padding-right: 1em;
  padding-top: calc(.5em - 1px);
  position: relative;
  text-align: center;
  vertical-align: top;
  white-space: nowrap;
`

const inputLabelStyle = css`
  color: #363636;
  font-size: 1rem;
  font-weight: 700;
`

// const amountInputStyle = css`
//   background-color: #FFF;
//   border-color: #DBDBDB;
//   border-radius: 4px;
//   color: #363636;
// `

export function TransactionInputs () {
  let amountInput
  let creditInput
  let debitInput
  let descriptionInput
  let merchantSelect
  let userSelect
  const [txId] = useState(new URLSearchParams(window.location.search).get('txId'))
  const [createTransaction] = useMutation(CREATE_TRANSACTION)
  const [updateTransaction] = useMutation(UPDATE_TRANSACTION)
  const { data: merchantsData } = useQuery(GET_MERCHANTS)
  const { data: usersData } = useQuery(GET_USERS)
  const { data: transactionsData } = useQuery(GET_SIMPLE_TRANSACTIONS)
  const [transaction, setTransaction] = useState((txId && transactionsData && transactionsData.transactions.find(tx => tx.id === txId)) || { amount: null, credit: false, debit: false, description: '', merchantId: '', userId: '' })

  const getValue = (fieldName) => {
    if (transactionsData) {
      if (fieldName === 'amount') {
        return parseFloat(transaction[fieldName] + 'e-2')
      }
      return transaction[fieldName]
    } else {
      return ''
    }
  }

  const handleChange = ({ target }) => {
    const currentTransaction = (txId && transactionsData && transactionsData.transactions.find(tx => tx.id === txId)) || transaction
    const cleanValue = target.name === 'amount' ? parseFloat(target.value + 'e2') : target.value
    switch (cleanValue) {
      case 'credit':
        setTransaction({ ...currentTransaction, credit: true, debit: false })
        break
      case 'debit':
        setTransaction({ ...currentTransaction, credit: false, debit: true })
        break
      default:
        setTransaction({ ...currentTransaction, [target.name]: cleanValue })
        break
    }
  }

  const submitChanges = () => {
    txId ? updateTransaction({ variables: { ...transaction } }) : createTransaction({ variables: transaction })
  }

  return (
    <form onSubmit={e => {
      e.preventDefault()
      submitChanges()
      amountInput.value = ''
      creditInput.checked = false
      debitInput.checked = false
      descriptionInput.value = ''
      merchantSelect.value = ''
      userSelect.value = ''
    }}>
      <div css={formWrapper}>
        <div css={amountStyle}>
          <label css={inputLabelStyle} htmlFor='amount'>Amount</label><br />
          <input css={inputWidthStyle} name='amount' onChange={handleChange} ref={node => { amountInput = node }} required step='.01' type='number' value={txId ? getValue('amount') : (transaction.amount === null ? '' : parseFloat(transaction.amount + 'e-2'))} />
          <br /><br />
        </div>

        <div css={descriptionStyle}>
          <label css={inputLabelStyle} htmlFor='description'>Description</label><br />
          <textarea css={inputWidthStyle} name='description' onChange={handleChange} ref={node => { descriptionInput = node }} required type='text' value={txId ? getValue('description') : (transaction.description === '' ? '' : transaction.description)} />
          <br /><br />
        </div>

        <div css={merchantStyle}>
          <label css={inputLabelStyle} htmlFor='merchantId'>Choose a Merchant</label><br />
          <select css={inputWidthStyle} name='merchantId' onBlur={handleChange} ref={node => { merchantSelect = node }} required>
            <option value=''>- Select a merchant</option>
            {merchantsData && merchantsData.merchants.map(({ id, name }) => (
              <option key={id} selected={txId ? getValue('merchantId') === id : false} value={id}>{name}</option>
            ))}
          </select>
          <br /><br />
        </div>

        <div css={userStyle}>
          <label css={inputLabelStyle} htmlFor='userId'>Choose a User</label><br />
          <select css={inputWidthStyle} name='userId' onBlur={handleChange} ref={node => { userSelect = node }} required>
            <option value=''>- Select a user</option>
            {usersData && usersData.users.map(({ id, firstName, lastName }) => (
              <option key={id} selected={txId ? getValue('userId') === id : false} value={id}>{`${firstName} ${lastName}`}</option>
            ))}
          </select>
          <br /><br />
        </div>

        <div css={creditDebitStyle}>
          <input checked={txId ? getValue('credit') === true : transaction.credit} name='creditOrDebit' onChange={handleChange} ref={node => { creditInput = node }} required type='radio' value='credit' />
          <label htmlFor='credit'>Credit</label><br />
          <input checked={txId ? getValue('debit') === true : transaction.debit} name='creditOrDebit' onChange={handleChange} ref={node => { debitInput = node }} required type='radio' value='debit' />
          <label htmlFor='debit'>Debit</label>
          <br /><br />
        </div>

      </div>
      <div css={saveButtonGrid}>
        <button css={buttonStyle} type='submit'>
          Save
        </button>
      </div>
    </form>
  )
}
