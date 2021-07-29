import React, { FC } from 'react'
import { joinClasses } from '../utils/TailWind'

const HeaderButton: FC = (props) => {
  return (
    <input
      type="button"
      className={joinClasses(['bg-gray-200', 'rounded', 'text-white'])}
      {...props}
    />
  )
}

export default HeaderButton
