import React, { FC } from 'react'
import { syncGalleryFiles } from '../../lib/api/Files'
import { Category } from '../../types'
import FileUpload from '../FileUpload/FileUpload'
import WithHeader from '../WithHeader'

interface Props {
  category: Category
}

const Gallery: FC<Props> = ({ category }) => (
  <FileUpload onSubmit={syncGalleryFiles(category)} category={category} />
)

export default WithHeader(Gallery)
