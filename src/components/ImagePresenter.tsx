import { InfoIcon } from '@chakra-ui/icons'
import React from 'react'
import { ImageForGallery } from '../../common/interface/ConsumerData'

interface Props {
  onClick?: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void
  image: Partial<ImageForGallery>
  onInfoClick?: React.MouseEventHandler<SVGElement>
}

const ImagePresenter = ({ onClick, image, onInfoClick }: Props) => {
  return (
    <span className="inline-block relative mx-3 mb-3 p-0 w-56 h-56 bg-gray-100 rounded-lg">
      {onInfoClick && (
        <InfoIcon
          boxSize="1.5em"
          border="black"
          color="white"
          className="absolute mt-2 ml-48"
          onClick={onInfoClick}
        />
      )}

      <img
        className="object-cover h-full p-1 m-auto border"
        src={image.url!}
        onClick={onClick}
      />
    </span>
  )
}

export default ImagePresenter
