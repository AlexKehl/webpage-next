import '../globalstyles/gallery.css'
import { Provider } from 'react-redux'
import store from '../redux/store.js'

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
