import 'tailwindcss/tailwind.css'
import '../src/globalstyles/gallery.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { startMock } from '../src/mocks'
import { ENV, PUBLIC_API_MOCKING_ENABLED } from '../src/constants/EnvProxy'
import { FullPageLoaderContextProvider } from '../src/lib/contexts/FullPageLoaderContext'
import { StepsStyleConfig as Steps } from 'chakra-ui-steps'
import { Provider } from 'react-redux'
import { store } from '../src/redux/store'
import React from 'react'

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
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <FullPageLoaderContextProvider>
          <Component {...pageProps} />
        </FullPageLoaderContextProvider>
      </ChakraProvider>
    </Provider>
  )
}
