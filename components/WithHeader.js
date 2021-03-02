import Header from './Header'
import React from 'react'

const WithHeader = (Component) => (props) => (
  <div>
    <Header />
    <Component {...props} />
  </div>
)

export default WithHeader
