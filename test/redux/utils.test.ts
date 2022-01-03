import HttpStatus from 'common/constants/HttpStatus'
import { toastByError, WithToast, withToasts } from 'src/redux/utils'
import { rejectedMutation } from '../utils/Redux'

describe('toastByError', () => {
  const handlers = {
    [HttpStatus.UNAUTHORIZED]: 'wrongCredentials',
    [HttpStatus.NOT_FOUND]: 'userNotRegistered',
    default: 'unexpectedError',
  } as any
  it('sets state toast according to errortype', () => {
    const res = toastByError(handlers)(
      { ...withToasts },
      rejectedMutation({
        endpoint: 'user',
        payload: { status: HttpStatus.UNAUTHORIZED },
      }) as any
    )

    const expected: WithToast = {
      ...withToasts,
      toast: { text: 'wrongCredentials', type: 'error' },
    }

    expect(res).toEqual(expected)
  })

  it('sets default text if status handler is not there', () => {
    const res = toastByError(handlers)(
      { ...withToasts },
      rejectedMutation({
        endpoint: 'user',
        payload: { status: HttpStatus.INTERNAL_SERVER_ERROR },
      }) as any
    )

    const expected: WithToast = {
      ...withToasts,
      toast: { text: 'unexpectedError', type: 'error' },
    }

    expect(res).toEqual(expected)
  })
})
