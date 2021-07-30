import React, { FC } from 'react'
import Profile from '../src/components/Profile'
import useUser from '../src/lib/hooks/useUser'

const ProfilePage: FC = () => {
  const { getUser } = useUser()
  return <Profile {...getUser()} />
}

export default ProfilePage
