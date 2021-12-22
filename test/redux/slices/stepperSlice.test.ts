import HttpStatus from '../../../common/constants/HttpStatus'
import { userResponse } from '../../../common/fixtures/User'
import stepperSlice, {
  initialState,
  stepperActions,
  StepperState,
} from '../../../src/redux/slices/stepperSlice'
import { withLoader, withRedirect, withToasts } from '../../../src/redux/utils'
import {
  fulfilledMutation,
  fulfilledQuery,
  rejectedMutation,
} from '../../utils/Redux'

describe('setActiveStep', () => {
  it('sets active step only if previous step is selected', () => {
    const initialState: StepperState = {
      ...withLoader,
      ...withRedirect,
      ...withToasts,
      isLoading: false,
      activeStep: 1,
    }

    const res = stepperSlice(initialState, stepperActions.setActiveStep(2))
    expect(res.activeStep).toEqual(1)
  })
})

describe('user query', () => {
  it('sets user on successfull user fetch', () => {
    const res = stepperSlice(
      initialState,
      fulfilledQuery({ payload: userResponse, endpoint: 'user' })
    )

    expect(res.user).toEqual(userResponse)
  })

  it('does not set user if query rejects', () => {
    const res = stepperSlice(
      initialState,
      rejectedMutation({
        payload: { status: HttpStatus.NOT_FOUND },
        endpoint: 'user',
      })
    )

    expect(res.user).toBe(undefined)
  })
})

describe('contactInformation', () => {
  it('sets next step on fulfilled', () => {
    const res = stepperSlice(
      initialState,
      fulfilledMutation({ endpoint: 'contactInformation' })
    )

    expect(res.activeStep).toBe(1)
  })
  it('handles HttpStatus.NOT_FOUND', () => {
    const res = stepperSlice(
      initialState,
      rejectedMutation({
        payload: { status: HttpStatus.NOT_FOUND },
        endpoint: 'contactInformation',
      })
    )

    expect(res.toast).toEqual({ type: 'error', text: 'userNotRegistered' })
  })

  it('handles HttpStatus.UNAUTHORIZED', () => {
    const res = stepperSlice(
      initialState,
      rejectedMutation({
        payload: { status: HttpStatus.UNAUTHORIZED },
        endpoint: 'contactInformation',
      })
    )

    expect(res.toast).toEqual({ type: 'error', text: 'sessionExpired' })
  })

  it('handles other errors', () => {
    const res = stepperSlice(
      initialState,
      rejectedMutation({
        payload: { status: HttpStatus.INTERNAL_SERVER_ERROR },
        endpoint: 'contactInformation',
      })
    )

    expect(res.toast).toEqual({ type: 'error', text: 'unexpectedError' })
  })
})

describe('addressInformation', () => {
  it('sets next step on fulfilled', () => {
    const res = stepperSlice(
      initialState,
      fulfilledMutation({ endpoint: 'addressInformation' })
    )

    expect(res.activeStep).toBe(1)
  })
  it('handles HttpStatus.NOT_FOUND', () => {
    const res = stepperSlice(
      initialState,
      rejectedMutation({
        payload: { status: HttpStatus.NOT_FOUND },
        endpoint: 'addressInformation',
      })
    )

    expect(res.toast).toEqual({ type: 'error', text: 'userNotRegistered' })
  })

  it('handles HttpStatus.UNAUTHORIZED', () => {
    const res = stepperSlice(
      initialState,
      rejectedMutation({
        payload: { status: HttpStatus.UNAUTHORIZED },
        endpoint: 'addressInformation',
      })
    )

    expect(res.toast).toEqual({ type: 'error', text: 'sessionExpired' })
  })

  it('handles other errors', () => {
    const res = stepperSlice(
      initialState,
      rejectedMutation({
        payload: { status: HttpStatus.INTERNAL_SERVER_ERROR },
        endpoint: 'addressInformation',
      })
    )

    expect(res.toast).toEqual({ type: 'error', text: 'unexpectedError' })
  })
})

describe('checkout', () => {
  it('sets redirectUrl on fulfilled', () => {
    const res = stepperSlice(
      initialState,
      fulfilledMutation({
        endpoint: 'checkout',
        payload: { redirect: 'someUrl' },
      })
    )

    expect(res.redirectUrl).toBe('someUrl')
  })

  it('handles generic error', () => {
    const res = stepperSlice(
      initialState,
      rejectedMutation({
        endpoint: 'checkout',
        payload: { status: HttpStatus.INTERNAL_SERVER_ERROR },
      })
    )

    expect(res.redirectUrl).toBe(undefined)
    expect(res.toast).toEqual({ type: 'error', text: 'unexpectedError' })
  })
})
