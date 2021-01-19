import React, { Fragment, useState } from 'react'
import { useQuery } from '@apollo/client'
import GetTransactions from '../gql/transactions.gql'
import { TxTable } from '../components/transactions/TxTable'
import { Link } from 'react-router-dom'

export function Home () {
  const { loading, error, data = {} } = useQuery(GetTransactions)
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
      <button onClick={() => toggleIsRoman(!isRoman)}>Toggle Roman Numerals</button>
      <Link style={{ paddingLeft: 12 + 'px' }} to='/create-transaction'>Create Transaction</Link>
      <TxTable data={data.transactions} isRoman={isRoman} />
    </Fragment>
  )
}
