import { useState } from 'react'
import { Cart, CartItem } from '../../types'

interface Props {
  cartFromLocalStorage?: Cart
  setCartInLocalStorage: (cart: Cart) => void
}

const useCart = ({ cartFromLocalStorage, setCartInLocalStorage }: Props) => {
  const emptyCart: Cart = { items: [] }
  const [cart, setCartState] = useState<Cart>(cartFromLocalStorage || emptyCart)

  const setCart = (cart: Cart) => {
    setCartInLocalStorage(cart)
    setCartState(cart)
  }

  const hasItem = (item: CartItem) => {
    return Boolean(cart.items.find(({ id }) => id === item.id))
  }

  const addItem = (item: CartItem): void => {
    if (hasItem(item)) {
      return
    }
    setCart({
      ...cart,
      items: [...cart.items, item],
    })
  }

  const deleteItem = (item: CartItem): void => {
    setCart({
      ...cart,
      items: cart.items.filter(({ id }) => id !== item.id),
    })
  }

  return {
    addItem,
    cart,
    setCart,
    deleteItem,
  }
}

export default useCart
