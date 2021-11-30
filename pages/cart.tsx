import { useRouter } from 'next/router'
import Cart from '../src/components/Cart'
import WithHeader from '../src/components/HOC/WithHeader'
import { getItem, setItem } from '../src/lib/utils/LocalStorage'
import { Cart as CartType } from '../src/types'

const CartPage = () => {
  const router = useRouter()
  const cart = getItem('cart')
  const setCart = (cart: CartType) => setItem('cart', cart)
  return (
    <Cart
      cartFromLocalStorage={cart}
      setCartInLocalStorage={setCart}
      onRedirect={(url) => router.push(url)}
    />
  )
}

export default WithHeader(CartPage)
