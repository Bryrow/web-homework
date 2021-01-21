import React, { Fragment } from 'react'
import { TransactionInputs } from '../../components/transactions/TransactionInputs'
import { css } from '@emotion/core'

const box = css`
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 0.5em 1em -0.125em rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.02);
  color: #4a4a4a;
  display: block;
  padding: 1.25rem;
`

export function CreateTransaction () {
  return (
    <Fragment>
      <div css={box}>
        <TransactionInputs />
      </div>
    </Fragment>
  )
}
