import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../../common/interface/ConsumerResponses'

export interface PaymentState {
  user?: User
}

const initialState: PaymentState = {}

export const paymentSlice = createSlice({
  name: 'paymentPage',
  initialState,
  reducers: {
    setUserDara: (state, action: PayloadAction<PaymentState['user']>) => {
      state.user = action.payload
    },
  },
})

export const paymentActions = paymentSlice.actions
export default paymentSlice.reducer
