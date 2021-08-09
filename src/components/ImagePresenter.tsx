import { InfoOutlineIcon } from '@chakra-ui/icons'
import React, { FC } from 'react'
import { ImageForGallery } from '../../../common/interface/ConsumerData'

interface Props {
  onClick?: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void
  image: Partial<ImageForGallery>
  onInfoClick?: React.MouseEventHandler<SVGElement>
}

const ImagePresenter: FC<Props> = ({ onClick, image, onInfoClick }) => {
  return (
    <span className="inline-block mx-3 mb-3 p-0 w-48 h-48 bg-gray-100 rounded-lg">
      {onInfoClick && (
        <InfoOutlineIcon
          boxSize="1em"
          className="absolute ml-44"
          onClick={onInfoClick}
        />
      )}
      <img
        className="object-cover h-full p-1 m-auto border"
        src={image.url}
        onClick={onClick}
      />
    </span>
  )
}

export default ImagePresenter
