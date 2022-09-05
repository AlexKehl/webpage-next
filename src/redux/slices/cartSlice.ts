import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Cart, CartItem } from 'src/features/cart/types'
import { getItem } from 'src/lib/utils/LocalStorage'
import { RootState } from 'src/redux/store'

export interface CartState {
  cart: Cart
}

const initialState: CartState = {
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
      if (hasItem(state.cart, action.payload)) {
        return
      }
      const newItems = [...state.cart.items, action.payload]
      state.cart.items = newItems
    },
    deleteCartItem: (state, action: PayloadAction<CartItem['id']>) => {
      const newItems = state.cart.items.filter(
        ({ id }) => id !== action.payload
      )
      state.cart.items = newItems
    },
    setCart: (state, action: PayloadAction<CartState['cart'] | undefined>) => {
      state.cart = action.payload || initialState.cart
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
