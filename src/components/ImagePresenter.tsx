import { InfoIcon } from '@chakra-ui/icons'
import React from 'react'
import { Flex } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'

interface Props {
  onClick?: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void
  src: string
  onInfoClick?: React.MouseEventHandler<SVGElement>
}

const ImagePresenter = ({ onClick, src, onInfoClick }: Props) => {
  return (
    <Flex p="1" mx="2" width="40" bgColor="gray.200">
      <InfoIcon
        m="1"
        position="absolute"
        cursor="pointer"
        boxSize="1.5em"
        color="white"
        onClick={onInfoClick}
        _hover={{ color: 'gray.200' }}
      />

      <Image
        src={src}
        fit="contain"
        alt=""
        cursor="pointer"
        onClick={onClick}
      />
    </Flex>
  )
}

export default ImagePresenter
