import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { cartActions } from '../../redux/slices/cartSlice'
import { Cart, CartItem } from '../../types'
import useI18n from './useI18n'
import useToasts from './useToasts'

interface Props {
  cartFromLocalStorage?: Cart
  setCartInLocalStorage: (cart: Cart) => void
}

const useCart = ({ setCartInLocalStorage }: Props) => {
  const { cart } = useAppSelector((state) => state.cart)
  const dispatch = useAppDispatch()
  // const { showSuccess } = useToasts()
  const { t } = useI18n()

  useEffect(() => {
    setCartInLocalStorage(cart)
  }, [cart])

  const hasItem = (item: CartItem) => {
    return Boolean(cart.items.find(({ id }) => id === item.id))
  }

  const addItem = (item: CartItem): void => {
    if (hasItem(item)) {
      return
    }
    dispatch(cartActions.addCartItem(item))
    // showSuccess({ text: t.cartItemAdded })
  }

  const deleteItem = (id: CartItem['id']): void => {
    dispatch(cartActions.deleteCartItem(id))
    // showSuccess({ text: t.cartItemRemoved })
  }

  return {
    addItem,
    cart,
    deleteItem,
  }
}

export default useCart
