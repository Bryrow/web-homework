import React, { Fragment } from 'react'
import { useQuery } from '@apollo/client'
import { GET_USERS } from '../../gql/users'
import { UserTable } from '../../components/users/UserTable'
import { css } from '@emotion/core'
// import { Link } from 'react-router-dom'

const box = css`
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 0.5em 1em -0.125em rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.02);
  color: #4a4a4a;
  display: block;
  padding: 1.25rem;
`

export function Users () {
  const { loading, error, data = {} } = useQuery(GET_USERS)

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
      <div css={box}>
        {/* <Link style={{ paddingLeft: 12 + 'px' }} to='/create-user'>Create User</Link> */}
        <UserTable data={data.users} />
      </div>
    </Fragment>
  )
}
