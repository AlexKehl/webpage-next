import { rest } from 'msw'
import HttpStatus from '../../common/constants/HttpStatus'
import { API } from '../../config'

export const handlers = [
  rest.post(`${API}/login`, (req, res, ctx) => {
    return res(
      ctx.cookie('accessToken', 'someEncodedJWT', {
        sameSite: true,
        secure: true,
      }),

      ctx.cookie('refreshToken', 'someEncodedJWT', {
        httpOnly: true,
        sameSite: true,
        secure: true,
      }),
      ctx.status(HttpStatus.OK)
    )
  }),
]
