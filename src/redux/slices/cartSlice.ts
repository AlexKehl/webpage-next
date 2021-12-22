import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getItem } from '../../lib/utils/LocalStorage'
import { Cart, CartItem } from '../../types'
import { RootState } from '../store'
import { withRedirect, WithRedirect, WithToast, withToasts } from '../utils'

export interface CartState extends WithRedirect, WithToast {
  cart: Cart
}

const initialState: CartState = {
  ...withRedirect,
  ...withToasts,
  cart: getItem('cart') || { items: [] },
}

const hasItem = (cart: Cart, item: CartItem) => {
  return Boolean(cart.items.find(({ id }) => id === item.id))
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem: (state, action: PayloadAction<CartItem>) => {
      if (!hasItem(state.cart, action.payload)) {
        state.cart.items = [...state.cart.items, action.payload]
        state.toast = { text: 'cartItemAdded', type: 'success' }
      }
    },
    deleteCartItem: (state, action: PayloadAction<CartItem['id']>) => {
      state.cart.items = state.cart.items.filter(
        ({ id }) => id !== action.payload
      )
      state.toast = { text: 'cartItemRemoved', type: 'success' }
    },
    setCart: (state, action: PayloadAction<CartState['cart'] | undefined>) => {
      state.cart = action.payload || initialState.cart
    },
    checkout: (state) => {
      state.redirectUrl = '/payments'
    },
  },
})

export const cartSelector = (state: RootState) => state.cart
export const cartActions = cartSlice.actions
export default cartSlice.reducer
