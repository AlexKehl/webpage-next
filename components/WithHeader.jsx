import Header from './Header'
import React from 'react'

const WithHeader = Component => {
  return props => {
    return (
      <div>
        <Header />
        <Component {...props} />
      </div>
    )
  }
}

export default WithHeader
