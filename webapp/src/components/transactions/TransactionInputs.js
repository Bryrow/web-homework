import React from 'react'
import { css } from '@emotion/core'
import { useQuery } from '@apollo/client'
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

function createTransaction () {

}

export function TransactionInputs () {
  const { data: merchantsData } = useQuery(GET_MERCHANTS)
  const { data: usersData } = useQuery(GET_USERS)

  return (
    <div>
      <label htmlFor='amount'>Amount</label><br />
      <input name='amount' type='number' /><br /><br />

      <input name='creditOrDebit' type='radio' value='credit' />
      <label htmlFor='credit'>Credit</label><br />
      <input name='creditOrDebit' type='radio' value='debit' />
      <label htmlFor='debit'>Debit</label>
      <br /><br />

      <label htmlFor='description'>Description</label><br />
      <input name='description' type='text' /><br /><br />

      <label htmlFor='merchant'>Choose a Merchant</label><br />
      <select name='merchant'>
        {merchantsData && merchantsData.merchants.map(({ id, name }) => (
          <option key={id} value={id}>{name}</option>
        ))}
      </select>
      <br /><br />

      <label htmlFor='user'>Choose a User</label><br />
      <select name='user'>
        {usersData && usersData.users.map(({ id, firstName, lastName }) => (
          <option key={id} value={id}>{`${firstName} ${lastName}`}</option>
        ))}
      </select>
      <br /><br />

      <button css={buttonStyle} onClick={createTransaction()}>Create</button>
    </div>
  )
}
