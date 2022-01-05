import HttpStatus from 'common/constants/HttpStatus'
import { userResponse } from 'common/fixtures/User'
import userSlice from 'src/redux/slices/userSlice'
import { fulfilledQuery, rejectedQuery } from 'test/utils/Redux'

describe('login', () => {
  it('is fullfilled', () => {
    const res = userSlice(
      undefined,
      fulfilledQuery({
        endpoint: 'login',
        payload: {
          user: userResponse,
        },
      })
    )

    expect(res.user).toEqual(userResponse)
    expect(res.localStorage).toEqual({ key: 'user', value: userResponse })
    expect(res.toast).toEqual({ text: 'successFullLogin', type: 'success' })
    expect(res.redirectUrl).toBe('/')
  })

  it('handles HttpStatus.UNAUTHORIZED', () => {
    const res = userSlice(
      undefined,
      rejectedQuery({
        endpoint: 'login',
        payload: { status: HttpStatus.UNAUTHORIZED },
      })
    )

    expect(res.toast).toEqual({ text: 'wrongCredentials', type: 'error' })
  })

  it('handles HttpStatus.NOT_FOUND', () => {
    const res = userSlice(
      undefined,
      rejectedQuery({
        endpoint: 'login',
        payload: { status: HttpStatus.NOT_FOUND },
      })
    )

    expect(res.toast).toEqual({ text: 'userNotRegistered', type: 'error' })
  })

  it('handles other errors', () => {
    const res = userSlice(
      undefined,
      rejectedQuery({
        endpoint: 'login',
        payload: { status: HttpStatus.INTERNAL_SERVER_ERROR },
      })
    )

    expect(res.toast).toEqual({ text: 'unexpectedError', type: 'error' })
  })
})
