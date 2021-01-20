import React, { Fragment } from 'react'
import { useQuery } from '@apollo/client'
import { GET_MERCHANTS } from '../../gql/merchants'
import { MerchantTable } from '../../components/merchants/MerchantTable'
// import { Link } from 'react-router-dom'

export function Merchants () {
  const { loading, error, data = {} } = useQuery(GET_MERCHANTS)

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
      {/* <Link style={{ paddingLeft: 12 + 'px' }} to='/create-merchant'>Create Merchant</Link> */}
      <MerchantTable data={data.merchants} />
    </Fragment>
  )
}
