import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './routes'
import { ApolloProvider } from '@apollo/client'
import { client } from './network/apollo-client'
import { css } from '@emotion/core'

const background = css`
  background-color: #F7F7F7;
  height: 100vh;
`

ReactDOM.render(
  (
    <div css={background} data-app-init=''>
      <ApolloProvider client={client}>
        <AppRouter />
      </ApolloProvider>
    </div>
  ),
  document.getElementById('react-app')
)
