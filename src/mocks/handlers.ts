import { rest } from 'msw'
import HttpStatus from '../../common/constants/HttpStatus'
import { API } from '../../config'

export const handlers = [
  rest.post(`${API}/login`, (req, res, ctx) => {
    return res(
      ctx.cookie(
        'accessToken',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJyb2xlcyI6WyJBZG1pbiIsbnVsbF0sImlhdCI6MTYyODYyMDM0NjQ5MSwiZXhwIjoxNjI4NjIwMzQ2NTAxfQ.VChFSkrNk-gnf4iLkNWxt6HVdS18K5JdOO7szRnji_4',
        {
          secure: true,
        }
      ),

      ctx.cookie('refreshToken', 'someEncodedJWT', {
        httpOnly: true,
        secure: true,
      }),
      ctx.status(HttpStatus.OK)
    )
  }),

  rest.post(`${API}/logout`, (req, res, ctx) => {
    return res(ctx.status(HttpStatus.OK))
  }),
]
