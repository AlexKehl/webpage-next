import Header from './Header'
import React from 'react'
import { FC } from 'react'

const WithHeader = (Component: FC): FC => (props: any) => (
  <div>
    <Header />
    <Component {...props} />
  </div>
)

export default WithHeader
