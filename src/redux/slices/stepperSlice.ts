import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import HttpStatus from 'common/constants/HttpStatus'
import { User } from 'common/interface/ConsumerResponses'
import { BuyImageDto } from 'common/interface/Dto'
import { serverApi } from '../services/serverApi'
import { RootState } from '../store'
import {
  WithToast,
  WithLoader,
  withLoader,
  addLoadingMatcher,
  WithRedirect,
  toastByError,
  withToasts,
  withRedirect,
} from '../utils'

export interface StepperState extends WithToast, WithLoader, WithRedirect {
  activeStep: number
  user?: User
  address?: BuyImageDto['address']
  contact?: BuyImageDto['contact']
}

export const initialState: StepperState = {
  ...withRedirect,
  ...withToasts,
  ...withLoader,
  activeStep: 0,
}

export const handleStepperError = toastByError<StepperState>({
  [HttpStatus.NOT_FOUND]: 'userNotRegistered',
  [HttpStatus.UNAUTHORIZED]: 'sessionExpired',
  default: 'unexpectedError',
})

const nextStep = (state: StepperState): StepperState => {
  return { ...state, activeStep: state.activeStep + 1 }
}

const contactInformation = serverApi.endpoints.contactInformation
const addressInformation = serverApi.endpoints.addressInformation
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
    setContactData: (state, action: PayloadAction<BuyImageDto['contact']>) => {
      state.contact = action.payload
    },
    setAddressData: (state, action: PayloadAction<BuyImageDto['address']>) => {
      state.address = action.payload
    },
  },
  extraReducers: (builder) => {
    addLoadingMatcher<StepperState>(builder, contactInformation)
    addLoadingMatcher<StepperState>(builder, addressInformation)
    addLoadingMatcher<StepperState>(builder, checkout)

    builder.addMatcher(contactInformation.matchFulfilled, nextStep)
    builder.addMatcher(contactInformation.matchRejected, handleStepperError)
    builder.addMatcher(addressInformation.matchFulfilled, nextStep)
    builder.addMatcher(addressInformation.matchRejected, handleStepperError)
    builder.addMatcher(checkout.matchFulfilled, (state, action) => {
      state.redirect = { url: action.payload.redirect }
    })
    builder.addMatcher(checkout.matchRejected, handleStepperError)
  },
})

export const stepperSelector = (state: RootState) => state.stepper
export const checkoutDataSelector = (state: RootState) => ({
  address: state.stepper.address,
  contact: state.stepper.contact,
})
export const stepperActions = stepperSlice.actions
export default stepperSlice.reducer
