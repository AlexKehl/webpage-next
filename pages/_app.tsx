import 'tailwindcss/tailwind.css'
import '../src/globalstyles/gallery.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { startMock } from '../src/mocks'
import { ENV, PUBLIC_API_MOCKING_ENABLED } from '../src/constants/EnvProxy'
import Layout from '../src/components/Layout'
import { FullPageLoaderContextProvider } from '../src/lib/contexts/FullPageLoaderContext'
import { StepsStyleConfig as Steps } from 'chakra-ui-steps'

const theme = extendTheme({
  components: {
    Steps,
  },
})

export default function MyApp({ Component, pageProps }: any) {
  if (ENV === 'development' && PUBLIC_API_MOCKING_ENABLED) {
    startMock()
  }
  return (
    <ChakraProvider theme={theme}>
      <FullPageLoaderContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </FullPageLoaderContextProvider>
    </ChakraProvider>
  )
}
