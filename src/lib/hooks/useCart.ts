import { useState } from 'react'
import { Cart, CartItem } from '../../types'
import { getItem, setItem } from '../utils/LocalStorage'

const useCart = () => {
  const emptyCart: Cart = { items: [] }
  const [cart, setCartState] = useState<Cart>(getItem('cart') || emptyCart)

  const setCart = (cart: Cart) => {
    setItem('cart', cart)
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
