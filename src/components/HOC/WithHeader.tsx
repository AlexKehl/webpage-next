import React from 'react'
import { HOC } from '../../types'
import Header from '../Header'

// eslint-disable-next-line react/display-name
const WithHeader: HOC = (Component) => (props) =>
  (
    <div>
      <Header />
      <Component {...props} />
    </div>
  )

export default WithHeader
