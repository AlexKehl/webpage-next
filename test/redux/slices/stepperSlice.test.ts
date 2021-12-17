import HttpStatus from '../../../common/constants/HttpStatus'
import { userResponse } from '../../../common/fixtures/User'
import stepperSlice, {
  initialState,
  stepperActions,
} from '../../../src/redux/slices/stepperSlice'
import { fulfilledQuery, rejectedMutation } from '../../utils/Redux'

describe('canary', () => {
  it('canary', () => {
    const res = stepperSlice(undefined, stepperActions.setActiveStep(1))
    expect(res.activeStep).toBe(1)
  })

  it('sets user on successfull user fecth', () => {
    const res = stepperSlice(
      initialState,
      fulfilledQuery({ payload: userResponse, endpoint: 'user' })
    )

    expect(res.activeStep).toBe(1)
    expect(res.user).toEqual(userResponse)
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
})
