import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { StepsStyleConfig } from 'chakra-ui-steps'
import React from 'react'
import Navbar from 'src/features/navbar/components'
import { SessionProvider } from 'next-auth/react'
import { trpc } from 'src/utils/Trpc'

const theme = extendTheme({
  components: {
    Steps: StepsStyleConfig,
  },
})

function App({ Component, pageProps }: any) {
  return (
    <SessionProvider>
      <ChakraProvider theme={theme}>
        <Navbar />
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  )
}

export default trpc.withTRPC(App)
