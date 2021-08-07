import React, { FC } from 'react'
import useUser from '../../src/lib/hooks/useUser'
import ProfileView from './ProfileView'

const ProfilePage: FC = () => {
  const { getUser } = useUser()
  return (
    <div>
      <ProfileView {...getUser()} />
    </div>
  )
}

export default ProfilePage
