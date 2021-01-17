import React, { Fragment, useState } from 'react'
import { useQuery } from '@apollo/client'
import GetTransactions from '../gql/transactions.gql'
import { TxTable } from '../components/transactions/TxTable'

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
      <TxTable data={data.transactions} isRoman={isRoman} />
    </Fragment>
  )
}
