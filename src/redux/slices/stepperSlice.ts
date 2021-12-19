import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import HttpStatus from '../../../common/constants/HttpStatus'
import { User } from '../../../common/interface/ConsumerResponses'
import { serverApi } from '../services/serverApi'
import { RootState } from '../store'
import {
  WithToast,
  WithLoader,
  withLoader,
  addLoadingMatcher,
  WithRedirect,
} from '../utils'

export interface StepperState extends WithToast, WithLoader, WithRedirect {
  activeStep: number
  user?: User
}

export const initialState: StepperState = {
  activeStep: 0,
  ...withLoader,
}

export const handleStepperError = (
  state: StepperState,
  action: PayloadAction<FetchBaseQueryError>
): StepperState => {
  switch (action.payload?.status) {
    case HttpStatus.NOT_FOUND:
      return { ...state, toast: { type: 'error', text: 'userNotRegistered' } }
    case HttpStatus.UNAUTHORIZED:
      return { ...state, toast: { type: 'error', text: 'sessionExpired' } }
    default:
      return { ...state, toast: { type: 'error', text: 'unexpectedError' } }
  }
}

const nextStep = (state: StepperState): StepperState => {
  return { ...state, activeStep: state.activeStep + 1 }
}

const contactInformation = serverApi.endpoints.contactInformation
const addressInformation = serverApi.endpoints.addressInformation
const user = serverApi.endpoints.user
const checkout = serverApi.endpoints.checkout

export const stepperSlice = createSlice({
  name: 'stepper',
  initialState,
  reducers: {
    setActiveStep: (state, action: PayloadAction<number>) => {
      if (action.payload < state.activeStep) {
        state.activeStep = action.payload
      }
    },
    nextStep: nextStep,
    prevStep: (state) => {
      state.activeStep = state.activeStep - 1
    },
  },
  extraReducers: (builder) => {
    addLoadingMatcher<StepperState>(builder, contactInformation)
    addLoadingMatcher<StepperState>(builder, user)
    addLoadingMatcher<StepperState>(builder, addressInformation)
    addLoadingMatcher<StepperState>(builder, checkout)

    builder.addMatcher(user.matchFulfilled, (state, action) => {
      state.user = action.payload
    })
    builder.addMatcher(contactInformation.matchFulfilled, nextStep)
    builder.addMatcher(contactInformation.matchRejected, handleStepperError)
    builder.addMatcher(addressInformation.matchFulfilled, nextStep)
    builder.addMatcher(addressInformation.matchRejected, handleStepperError)
    builder.addMatcher(checkout.matchFulfilled, (state, action) => {
      state.redirectUrl = action.payload.redirect
    })
    builder.addMatcher(checkout.matchRejected, handleStepperError)
  },
})

export const stepperSelector = (state: RootState) => state.stepper
export const stepperActions = stepperSlice.actions
export default stepperSlice.reducer
