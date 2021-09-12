import React from 'react'
import { HOC } from '../../types'
import Header from '../Header'
import Navbar from '../Navbar'

// eslint-disable-next-line react/display-name
const WithHeader: HOC = (Component) => (props) =>
  (
    <div>
      <Navbar />
      <Component {...props} />
    </div>
  )

export default WithHeader
