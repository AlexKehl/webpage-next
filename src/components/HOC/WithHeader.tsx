import React from 'react'
import { HOC } from '../../types'
import Header from '../Header'

const WithHeader: HOC = (Component) => (props) => (
  <div>
    <Header />
    <Component {...props} />
  </div>
)

export default WithHeader
