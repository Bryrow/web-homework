import React, { Fragment, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_TRANSACTIONS } from '../gql/transactions'
import { TxTable } from '../components/transactions/TxTable'
import { Link } from 'react-router-dom'
import { css } from '@emotion/core'

const box = css`
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 0.5em 1em -0.125em rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.02);
  color: #4a4a4a;
  display: block;
  padding: 1.25rem;
`

const titleStyle = css`
  font-size: 2rem;
  color: #4A4A4A;
  font-weight: 600;
  line-height: 1.125;
`

const buttonStyle = css`
  align-items: center;
  background-color: #00C4A7;
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
  margin-bottom: .5rem;
  margin-right: .5rem;
  padding-bottom: calc(.5em - 1px);
  padding-left: 1em;
  padding-right: 1em;
  padding-top: calc(.5em - 1px);
  position: relative;
  text-align: center;
  vertical-align: top;
  white-space: nowrap;
`

const linkButtonStyle = css`
  align-items: center;
  background-color: #48C774;
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
  margin-left: .5rem;
  margin-bottom: .5rem;
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

const buttonsIsRight = css`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  margin-bottom 1rem;
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
      <h3 css={titleStyle}>Transactions</h3>
      <div css={box}>
        <div css={buttonsIsRight}>
          <button css={buttonStyle} onClick={() => toggleIsRoman(!isRoman)}>{isRoman ? 'Arabic' : 'Roman'}</button>
          <Link css={linkButtonStyle} to='/create-transaction'>Create Transaction</Link>
        </div>
        <TxTable data={data.transactions} isRoman={isRoman} />
      </div>
    </Fragment>
  )
}
