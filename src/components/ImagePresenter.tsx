import { InfoIcon } from '@chakra-ui/icons'
import React from 'react'
import { Box, Center } from '@chakra-ui/layout'
import Image from 'next/legacy/image'

interface Props {
  onClick?: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void
  src: string
  onInfoClick?: React.MouseEventHandler<SVGElement>
  width?: Record<string, any>
  height?: Record<string, any>
}

const ImagePresenter = ({
  onClick,
  src,
  onInfoClick,
  width,
  height,
}: Props) => {
  return (
    <Box
      p="1"
      m="2"
      width={width || { base: '90vw', sm: '60' }}
      height={height || { base: '60', sm: '60' }}
      bgColor="gray.200"
    >
      {onInfoClick && (
        <InfoIcon
          data-testid="info-icon"
          m="1"
          zIndex={500}
          position="absolute"
          cursor="pointer"
          boxSize="1.5em"
          color="gray.700"
          onClick={onInfoClick}
          _hover={{ color: 'gray.500' }}
        />
      )}
      <Center h="full" position="relative" cursor="pointer">
        <Image
          layout="fill"
          objectFit="contain"
          src={src}
          alt=""
          onClick={onClick}
        />
      </Center>
    </Box>
  )
}

export default ImagePresenter
