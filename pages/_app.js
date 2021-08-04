import 'tailwindcss/tailwind.css'
import '../src/globalstyles/gallery.css'
import 'react-dropzone-uploader/dist/styles.css'
import { ChakraProvider } from '@chakra-ui/react'

export default function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
