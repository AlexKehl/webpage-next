import Header from './Header'
import React, { ComponentType } from 'react'

const WithHeader = <P extends object>(Component: ComponentType<P>) => {
  return (props: P) => {
    return (
      <div>
        <Header />
        <Component {...props} />
      </div>
    )
  }
}

export default WithHeader
