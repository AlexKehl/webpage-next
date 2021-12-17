import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import HttpStatus from '../../../common/constants/HttpStatus'
import { User } from '../../../common/interface/ConsumerResponses'
import { serverApi } from '../services/serverApi'
import { RootState } from '../store'
import { WithToast, WithLoader, withLoader, addLoadingMatcher } from '../utils'

export interface StepperState extends WithToast, WithLoader {
  activeStep: number
  user?: User
}

export const initialState: StepperState = {
  activeStep: 0,
  ...withLoader,
}

export const stepperSlice = createSlice({
  name: 'stepper',
  initialState,
  reducers: {
    setActiveStep: (state, action: PayloadAction<number>) => {
      // if (action.payload > state.activeStep) {
      state.activeStep = action.payload
      // }
    },
    nextStep: (state) => {
      state.activeStep = state.activeStep + 1
    },
    prevStep: (state) => {
      state.activeStep = state.activeStep - 1
    },
  },
  extraReducers: (builder) => {
    addLoadingMatcher<StepperState>(
      builder,
      serverApi.endpoints.contactInformation
    )
    builder.addMatcher(
      serverApi.endpoints.user.matchFulfilled,
      (state, action) => {
        state.user = action.payload
        state.activeStep = state.activeStep + 1
        state.isLoading = false
      }
    )
    builder.addMatcher(serverApi.endpoints.user.matchRejected, (state) => {
      state.isLoading = false
    })
    builder.addMatcher(
      serverApi.endpoints.contactInformation.matchRejected,
      (state, action) => {
        switch (action.payload?.status) {
          case HttpStatus.NOT_FOUND:
            state.toast = { type: 'error', text: 'userNotRegistered' }
            return
          case HttpStatus.UNAUTHORIZED:
            state.toast = { type: 'error', text: 'sessionExpired' }
            return
          default:
            state.toast = { type: 'error', text: 'unexpectedError' }
        }
      }
    )
  },
})

export const stepperSelector = (state: RootState) => state.stepper
export const stepperActions = stepperSlice.actions
export default stepperSlice.reducer
