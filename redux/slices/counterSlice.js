import { createSlice } from '@reduxjs/toolkit'

const reducers = {
  increment: ({ counterValue, ...rest }) => ({
    ...rest,
    counterValue: counterValue + 1,
  }),
  decrement: ({ counterValue, ...rest }) => ({
    ...rest,
    counterValue: counterValue - 1,
  }),
}

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    counterValue: 0,
  },
  reducers,
})

export const selectCount = (state) => state.counter.counterValue

export const { increment, decrement } = counterSlice.actions

export default counterSlice.reducer
