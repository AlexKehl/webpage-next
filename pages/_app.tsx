import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { StepsStyleConfig as Steps } from 'chakra-ui-steps'
import React from 'react'
import { Provider } from 'react-redux'
import Navbar from 'src/features/navbar/components'
import 'src/globalstyles/gallery.css'
import { FullPageLoaderContextProvider } from 'src/lib/contexts/FullPageLoaderContext'
import { GlobalContextProvider } from 'src/lib/contexts/GlobalContext'
import { store } from 'src/redux/store'

const theme = extendTheme({
  components: {
    Steps,
  },
})

export default function MyApp({ Component, pageProps }: any) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <FullPageLoaderContextProvider>
          <GlobalContextProvider>
            <Navbar />
            <Component {...pageProps} />
          </GlobalContextProvider>
        </FullPageLoaderContextProvider>
      </ChakraProvider>
    </Provider>
  )
}
