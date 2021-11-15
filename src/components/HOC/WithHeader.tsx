import React from 'react'
import { HOC } from '../../types'
import Navbar from '../Navbar'

function HOC<T>(Component: (props: T) => JSX.Element) {
  const WithHeader = (props: T) => (
    <div>
      <Navbar />
      <Component {...props} />
    </div>
  )
  return WithHeader
}

export default HOC
