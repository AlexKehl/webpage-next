import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getItem } from '../../lib/utils/LocalStorage'
import { Cart, CartItem } from '../../types'
import { RootState } from '../store'
import {
  withLocalStorage,
  WithLocalStorage,
  withRedirect,
  WithRedirect,
  WithToast,
  withToasts,
} from '../utils'

export interface CartState
  extends WithRedirect,
    WithToast,
    WithLocalStorage<'cart'> {
  cart: Cart
}

const initialState: CartState = {
  ...withLocalStorage,
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
        const newItems = [...state.cart.items, action.payload]
        state.cart.items = newItems
        state.toast = { text: 'cartItemAdded', type: 'success' }
        state.localStorage = { key: 'cart', value: { items: newItems } }
      }
    },
    deleteCartItem: (state, action: PayloadAction<CartItem['id']>) => {
      const newItems = state.cart.items.filter(
        ({ id }) => id !== action.payload
      )
      state.cart.items = newItems
      state.localStorage = { key: 'cart', value: { items: newItems } }
      state.toast = { text: 'cartItemRemoved', type: 'success' }
    },
    setCart: (state, action: PayloadAction<CartState['cart'] | undefined>) => {
      state.cart = action.payload || initialState.cart
    },
    checkout: (state) => {
      state.redirectUrl = '/payments'
    },
    clearCart: (state) => {
      state.cart.items = []
    },
  },
})

export const cartSelector = (state: RootState) => state.cart
export const cartItemIdsSelector = (state: RootState) =>
  state.cart.cart.items.map((item) => item.id)
export const cartActions = cartSlice.actions
export default cartSlice.reducer
