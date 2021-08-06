import React, { FC } from 'react'
import useUser from '../../lib/hooks/useUser'
import { HOC } from '../../types'
import { hasRole } from '../../utils/UserUtils'

type WithAuth = <T>(component: FC<T>) => FC<T>

const WithAuth: HOC = (Component) => (props) => {
  const { getUser } = useUser()
  const shouldDisplay = hasRole(getUser(), 'Admin')
  return <div>{shouldDisplay && <Component {...props} />}</div>
}

export default WithAuth
