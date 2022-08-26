import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { StepsStyleConfig as Steps } from 'chakra-ui-steps'
import React from 'react'
import { Provider } from 'react-redux'
import Navbar from 'src/features/navbar/components'
import 'src/globalstyles/gallery.css'
import 'swagger-ui-react/swagger-ui.css'
import { store } from 'src/redux/store'
import { SessionProvider } from 'next-auth/react'
import { withTRPC } from '@trpc/next'
import { AppRouter } from './api/trpc/[trpc]'
import { useIsFetching } from 'react-query'
import FullPageLoader from 'src/components/FullPageLoader'

const theme = extendTheme({
  components: {
    Steps,
  },
})

function App({ Component, pageProps }: any) {
  const isFetching = useIsFetching()
  return (
    <SessionProvider>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <Navbar />
          <FullPageLoader isLoading={Boolean(isFetching)} />
          <Component {...pageProps} />
        </ChakraProvider>
      </Provider>
    </SessionProvider>
  )
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    if (typeof window !== 'undefined') {
      // during client requests
      return {
        url: '/api/trpc',
      }
    }
    // during SSR below

    // optional: use SSG-caching for each rendered page (see caching section for more details)
    const ONE_DAY_SECONDS = 60 * 60 * 24
    ctx?.res?.setHeader(
      'Cache-Control',
      `s-maxage=1, stale-while-revalidate=${ONE_DAY_SECONDS}`
    )

    // The server needs to know your app's full url
    // On render.com you can use `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}/api/trpc`
    const url = process.env['VERCEL_URL']
      ? `https://${process.env['VERCEL_URL']}/api/trpc`
      : 'http://localhost:3000/api/trpc'

    return {
      url,
      headers: {
        // optional - inform server that it's an ssr request
        'x-ssr': '1',
      },
      queryClientConfig: {
        defaultOptions: {
          queries: {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
          },
        },
      },
    }
  },
  ssr: true,
})(App)
