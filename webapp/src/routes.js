import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { css } from '@emotion/core'
import { Home } from './home'
import { Users } from './views/users'
import { CreateTransaction } from './views/create_transaction'
import { i18nPage } from './views/i18n'
import { Merchants } from './views/merchants'

function AppRouter () {
  return (
    <Router>
      <div css={layoutStyle}>
        <nav css={navStyle}>
          <ul>
            <li>
              <Link css={linkStyle} to='/'>Transactions</Link>
            </li>
            <li>
              <Link css={linkStyle} to='/users'>Users</Link>
            </li>
            <li>
              <Link css={linkStyle} to='/merchants'>Merchants</Link>
            </li>
            <li>
              <Link css={linkStyle} to='/i18n/app'>i18n</Link>
            </li>
          </ul>
        </nav>
        <div className='main-content' css={contentStyle}>
          <Route component={Home} exact path='/' />
          <Route component={Users} exact path='/users' />
          <Route component={Merchants} exact path='/merchants' />
          <Route component={i18nPage} exact path='/i18n/app' />
          <Route component={CreateTransaction} exact path='/create-transaction' />
        </div>
      </div>
    </Router>
  )
}

export default AppRouter

const layoutStyle = css`
  display: grid;
  grid-row-gap: 24px;
  padding: 16px;
  padding-top: 24px;
`

const navStyle = css`
  grid-row: 1;
  display: flex;
  justify-content: center;

  & > ul {
      display: flex;
      flex-direction: row;
      list-style-type: none;
  }
  
  & > ul > li:not(:first-of-type) {
    margin-left: 32px;
  }
`

const linkStyle = css`
  color: #4A4A4A;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 1.1px;
  line-height: 18px;
  text-decoration: none;
`

const contentStyle = css`
  grid-row: 2;
  flex-grow: 1;
  margin: 0 auto;
  position: relative;
  width: auto;
  max-width: 1344px;
`
