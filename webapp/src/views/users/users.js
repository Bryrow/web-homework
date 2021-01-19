import React, { Fragment } from 'react'
import { useQuery } from '@apollo/client'
import { GET_USERS } from '../../gql/users'
import { UserTable } from '../../components/users/UserTable'
// import { Link } from 'react-router-dom'

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
      {/* <Link style={{ paddingLeft: 12 + 'px' }} to='/create-user'>Create User</Link> */}
      <UserTable data={data.users} />
    </Fragment>
  )
}
