import React, { useState } from 'react'
import { css } from '@emotion/core'
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_TRANSACTION } from '../../gql/transactions'
import { GET_MERCHANTS } from '../../gql/merchants'
import { GET_USERS } from '../../gql/users'

const buttonStyle = css`
  background-color: #48c774;
  border-color: transparent;
  color: #fff;
  border-width: 1px;
  cursor: pointer;
  justify-content: center;
  padding-bottom: calc(.5em - 1px);
  padding-left: 1em;
  padding-right: 1em;
  padding-top: calc(.5em - 1px);
  text-align: center;
  white-space: nowrap;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 4px;
  box-shadow: none;
  display: inline-flex;
  font-size: 1rem;
  height: 2.5em;
  line-height: 1.5;
  position: relative;
  vertical-align: top;
`

export function TransactionInputs () {
  let amountInput = ''
  let creditInput = false
  let debitInput = false
  let descriptionInput = ''
  let merchantSelect = ''
  let userSelect = ''
  const [createTransaction] = useMutation(CREATE_TRANSACTION)
  const { data: merchantsData } = useQuery(GET_MERCHANTS)
  const { data: usersData } = useQuery(GET_USERS)
  const [transaction, setTransaction] = useState({ amount: 0, credit: false, debit: false, description: '', merchantId: '', userId: '' })

  const handleChange = ({ target }) => {
    const cleanValue = target.name === 'amount' ? parseFloat(target.value + 'e2') : target.value
    switch (cleanValue) {
      case 'credit':
        setTransaction({ ...transaction, credit: true, debit: false })
        break
      case 'debit':
        setTransaction({ ...transaction, credit: false, debit: true })
        break
      default:
        setTransaction({ ...transaction, [target.name]: cleanValue })
        break
    }
  }

  return (
    <form onSubmit={e => {
      e.preventDefault()
      createTransaction({ variables: transaction })
      amountInput.value = ''
      creditInput.value = false
      debitInput.value = false
      descriptionInput.value = ''
      merchantSelect.value = ''
      userSelect.value = ''
    }}>
      <label htmlFor='amount'>Amount</label><br />
      <input name='amount' onChange={handleChange} ref={node => { amountInput = node }} required step='.01' type='number' /><br /><br />

      <input name='creditOrDebit' onChange={handleChange} ref={node => { creditInput = node }} required type='radio' value='credit' />
      <label htmlFor='credit'>Credit</label><br />
      <input name='creditOrDebit' onChange={handleChange} ref={node => { debitInput = node }} required type='radio' value='debit' />
      <label htmlFor='debit'>Debit</label>
      <br /><br />

      <label htmlFor='description'>Description</label><br />
      <textarea name='description' onChange={handleChange} ref={node => { descriptionInput = node }} required type='text' /><br /><br />

      <label htmlFor='merchantId'>Choose a Merchant</label><br />
      <select name='merchantId' onBlur={handleChange} ref={node => { merchantSelect = node }} required>
        <option value=''>- Select a merchant</option>
        {merchantsData && merchantsData.merchants.map(({ id, name }) => (
          <option key={id} value={id}>{name}</option>
        ))}
      </select>
      <br /><br />

      <label htmlFor='userId'>Choose a User</label><br />
      <select name='userId' onBlur={handleChange} ref={node => { userSelect = node }} required>
        <option value=''>- Select a user</option>
        {usersData && usersData.users.map(({ id, firstName, lastName }) => (
          <option key={id} value={id}>{`${firstName} ${lastName}`}</option>
        ))}
      </select>
      <br /><br />
      <button css={buttonStyle} type='submit'>
        Create
      </button>
    </form>
  )
}
