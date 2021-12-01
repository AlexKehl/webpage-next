import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ContactInformationDto } from '../../../common/interface/Dto'

export interface PaymentState {
  contact?: ContactInformationDto
}

const initialState: PaymentState = {}

export const paymentSlice = createSlice({
  name: 'paymentPage',
  initialState,
  reducers: {
    setContactData: (state, action: PayloadAction<PaymentState['contact']>) => {
      state.contact = action.payload
    },
  },
})

export const paymentActions = paymentSlice.actions
export default paymentSlice.reducer
