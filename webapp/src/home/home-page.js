import React, { Fragment, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_TRANSACTIONS } from '../gql/transactions'
import { TxTable } from '../components/transactions/TxTable'
import { Link } from 'react-router-dom'
import { css } from '@emotion/core'

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

export function Home () {
  const { loading, error, data = {} } = useQuery(GET_TRANSACTIONS)
  const [isRoman, toggleIsRoman] = useState(false)

  if (loading) {
    return (
      <Fragment>
        Loading...
      </Fragment>
    )
  }

  if (error) {
    return (
      <Fragment>
        ¯\_(ツ)_/¯
      </Fragment>
    )
  }

  return (
    <Fragment>
      <button css={buttonStyle} onClick={() => toggleIsRoman(!isRoman)}>Toggle Roman Numerals</button>
      <Link style={{ paddingLeft: 12 + 'px' }} to='/create-transaction'>Create Transaction</Link>
      <TxTable data={data.transactions} isRoman={isRoman} />
    </Fragment>
  )
}
