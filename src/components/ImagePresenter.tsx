import { InfoIcon } from '@chakra-ui/icons'
import React from 'react'
import { Box, Center } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'

interface Props {
  onClick?: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void
  src: string
  onInfoClick?: React.MouseEventHandler<SVGElement>
}

const ImagePresenter = ({ onClick, src, onInfoClick }: Props) => {
  return (
    <Box
      p="1"
      m="2"
      width={{ base: '100vw', sm: '60' }}
      height={{ base: 'none', sm: '60' }}
      bgColor="gray.200"
    >
      {onInfoClick && (
        <InfoIcon
          m="1"
          position="absolute"
          cursor="pointer"
          boxSize="1.5em"
          color="gray.700"
          onClick={onInfoClick}
          _hover={{ color: 'gray.500' }}
        />
      )}
      <Center h="full">
        <Image
          src={src}
          fit="contain"
          maxW="full"
          maxH="full"
          mx="auto"
          alt=""
          cursor="pointer"
          onClick={onClick}
        />
      </Center>
    </Box>
  )
}

export default ImagePresenter
