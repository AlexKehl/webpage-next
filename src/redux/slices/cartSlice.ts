import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getItem } from '../../lib/utils/LocalStorage'
import { Cart, CartItem } from '../../types'

export interface CartState {
  cart: Cart
}

const initialState: CartState = {
  cart: getItem('cart') || { items: [] },
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem: (state, action: PayloadAction<CartItem>) => {
      state.cart.items = [...state.cart.items, action.payload]
    },
    deleteCartItem: (state, action: PayloadAction<CartItem['id']>) => {
      state.cart.items = state.cart.items.filter(
        ({ id }) => id !== action.payload
      )
    },
    setCart: (state, action: PayloadAction<CartState['cart'] | undefined>) => {
      state.cart = action.payload || initialState.cart
    },
  },
})

export const cartActions = cartSlice.actions
export default cartSlice.reducer
