import React from 'react'
import Spinner from '../../assets/spinner.gif'
import Image from 'next/image'
import { Box, Center } from '@chakra-ui/react'

const FullPageLoader = () => {
  return (
    <Box
      position="fixed"
      zIndex="1000"
      margin="auto"
      height="100vh"
      width="full"
      backgroundColor="gray.200"
      opacity="0.3"
      left="0"
      top="0"
      bottom="0"
      right="0"
    >
      <Center h="100vh">
        <Image src={Spinner} className="fp-loader" alt="loading" />
      </Center>
    </Box>
  )
}

export default FullPageLoader
