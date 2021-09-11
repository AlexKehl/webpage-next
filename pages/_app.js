import 'tailwindcss/tailwind.css'
import '../src/globalstyles/gallery.css'
import { ChakraProvider } from '@chakra-ui/react'
import { startMock } from '../src/mocks'
import { ENV, PUBLIC_API_MOCKING_ENABLED } from '../src/constants/EnvProxy'
import Layout from '../src/components/Layout'

export default function MyApp({ Component, pageProps }) {
  if (ENV === 'development' && PUBLIC_API_MOCKING_ENABLED) {
    startMock()
  }
  return (
    <ChakraProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
}
