import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ToastState {
  toast?: {
    text: string
    type: 'error' | 'success'
  }
}

const initialState: ToastState = {}

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<ToastState>) => {
      state.toast = action.payload.toast
    },
  },
})

export const toastActions = toastSlice.actions
export default toastSlice.reducer
