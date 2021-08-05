import React, { FC } from 'react'
import { syncGalleryFiles } from '../lib/api/Files'
import { User } from '../types'
import FileUpload from './FileUpload/FileUpload'
import WithHeader from './WithHeader'

const Profile: FC<User> = ({ email }) => {
  return (
    <div className="max-w-3xl">
      <FileUpload onSubmit={syncGalleryFiles('acryl')} category={'acryl'} />
    </div>
  )
}

export default WithHeader(Profile)
