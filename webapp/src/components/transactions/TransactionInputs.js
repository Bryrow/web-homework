import React, { useState } from 'react'
import { css } from '@emotion/core'
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_TRANSACTION, GET_SIMPLE_TRANSACTIONS, UPDATE_TRANSACTION } from '../../gql/transactions'
import { GET_MERCHANTS } from '../../gql/merchants'
import { GET_USERS } from '../../gql/users'

const buttonStyle = css`
  align-items: center;
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
  justify-content: center;
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

// const inputStyle = css`
//   align-items: center;
//   background-color: #FFF;
//   border-color: #B5B5B5;
//   border-radius: 4px;
//   border: 1px solid transparent;
//   box-shadow: inset 0 0.0625em 0.125em rgba(10,10,10,.05);
//   color: #363636;
//   display: inline-flex;
//   font-size: 1rem;
//   height: 1.5em;
//   justify-content: flex-start;
//   line-height: 1.5;
//   padding-bottom: calc(.5em - 1px);
//   padding-left: calc(.75em - 1px);
//   padding-right: calc(.75em - 1px);
//   padding-top: calc(.5em - 1px);
//   position: relative;
//   vertical-align: top;
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
      <label htmlFor='amount'>Amount</label><br />
      <input name='amount' onChange={handleChange} ref={node => { amountInput = node }} required step='.01' type='number' value={txId ? getValue('amount') : (transaction.amount === null ? '' : parseFloat(transaction.amount + 'e-2'))} /><br /><br />

      <input checked={txId ? getValue('credit') === true : transaction.credit} name='creditOrDebit' onChange={handleChange} ref={node => { creditInput = node }} required type='radio' value='credit' />
      <label htmlFor='credit'>Credit</label><br />
      <input checked={txId ? getValue('debit') === true : transaction.debit} name='creditOrDebit' onChange={handleChange} ref={node => { debitInput = node }} required type='radio' value='debit' />
      <label htmlFor='debit'>Debit</label>
      <br /><br />

      <label htmlFor='description'>Description</label><br />
      <textarea name='description' onChange={handleChange} ref={node => { descriptionInput = node }} required type='text' value={txId ? getValue('description') : (transaction.description === '' ? '' : transaction.description)} /><br /><br />

      <label htmlFor='merchantId'>Choose a Merchant</label><br />
      <select name='merchantId' onBlur={handleChange} ref={node => { merchantSelect = node }} required>
        <option value=''>- Select a merchant</option>
        {merchantsData && merchantsData.merchants.map(({ id, name }) => (
          <option key={id} selected={txId ? getValue('merchantId') === id : false} value={id}>{name}</option>
        ))}
      </select>
      <br /><br />

      <label htmlFor='userId'>Choose a User</label><br />
      <select name='userId' onBlur={handleChange} ref={node => { userSelect = node }} required>
        <option value=''>- Select a user</option>
        {usersData && usersData.users.map(({ id, firstName, lastName }) => (
          <option key={id} selected={txId ? getValue('userId') === id : false} value={id}>{`${firstName} ${lastName}`}</option>
        ))}
      </select>
      <br /><br />
      <button css={buttonStyle} type='submit'>
        Create
      </button>
    </form>
  )
}
