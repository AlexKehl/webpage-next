import React, { FC } from 'react'
import FileUpload from '../src/components/FileUpload'
import Profile from '../src/components/Profile'
import { syncGalleryFiles } from '../src/lib/api/Files'
import useUser from '../src/lib/hooks/useUser'

const ProfilePage: FC = () => {
  const { getUser } = useUser()

  return (
    <div>
      <Profile {...getUser()} />
      <FileUpload onSubmit={syncGalleryFiles} category={'acryl'} />
    </div>
  )
}

export default ProfilePage
