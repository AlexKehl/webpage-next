import React, { Fragment } from 'react'
import { Box, Center, Spinner } from '@chakra-ui/react'

interface Props {
  isLoading: boolean
}

const FullPageLoader = ({ isLoading }: Props) => {
  return (
    <Fragment>
      {isLoading && (
        <Box
          position="fixed"
          zIndex={Number.MAX_SAFE_INTEGER}
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
            <Spinner display="block" mx="auto" w={48} h={48} />
          </Center>
        </Box>
      )}
    </Fragment>
  )
}

export default FullPageLoader
