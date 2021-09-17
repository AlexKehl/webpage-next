import React from 'react'
import Spinner from '../../assets/spinner.gif'
import Image from 'next/image'
import { Box, Center } from '@chakra-ui/react'

const FullPageLoader = () => {
  return (
    <Center
      position="absolute"
      w="full"
      h="100vh"
      zIndex="1000"
      backgroundColor="gray.200"
      opacity="0.2"
    >
      <Box opacity="1">
        <Image src={Spinner} className="fp-loader" alt="loading" />
      </Box>
    </Center>
  )
}

export default FullPageLoader
