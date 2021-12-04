import { rest } from 'msw'
import { Endpoints } from '../../common/constants/Endpoints'
import HttpStatus from '../../common/constants/HttpStatus'
import { API } from '../../src/constants/EnvProxy'

export const handlers = [
  rest.post(`${API}${Endpoints.login}`, (_req, res, ctx) => {
    return res(
      ctx.cookie(
        'accessToken',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJyb2xlcyI6WyJBZG1pbiIsbnVsbF0sImlhdCI6MTYyODYyMDM0NjQ5MSwiZXhwIjoxNjI4NjIwMzQ2NTAxfQ.VChFSkrNk-gnf4iLkNWxt6HVdS18K5JdOO7szRnji_4',
        {
          secure: true,
        }
      ),

      ctx.status(HttpStatus.OK)
    )
  }),

  rest.post(`${API}${Endpoints.logout}`, (_req, res, ctx) => {
    return res(ctx.status(HttpStatus.OK))
  }),

  rest.post(`${API}/register`, (_req, res, ctx) => {
    return res(ctx.status(HttpStatus.OK))
  }),
]
