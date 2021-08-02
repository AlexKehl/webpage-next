import Header from './Header'
import React from 'react'
import { HOC } from '../types'

const WithHeader: HOC = (Component) => (props) => (
  <div>
    <Header />
    <Component {...props} />
  </div>
)

export default WithHeader
