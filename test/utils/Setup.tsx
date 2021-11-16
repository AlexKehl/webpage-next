import { rest } from 'msw'
import { Endpoints } from '../../common/constants/Endpoints'
import HttpStatus from '../../common/constants/HttpStatus'
import { ValueOf } from '../../common/types'
import { server } from '../../src/mocks/server'
import * as router from 'next/router'
import { API } from '../../src/constants/EnvProxy'
import React from 'react'
import { FullPageLoaderContextProvider } from '../../src/lib/contexts/FullPageLoaderContext'
import { render } from '@testing-library/react'
import axios from 'axios'

interface MockRouterOpts {
  query?: Record<string, string>
}
export const mockRouter = ({ query = {} }: MockRouterOpts = {}) => {
  // @ts-ignore
  router.useRouter = () => ({
    push: jest.fn(),
    locale: 'en',
    query,
    isReady: true,
  })
}

export const renderWithContext = (component: JSX.Element) => {
  return render(
    <FullPageLoaderContextProvider>{component}</FullPageLoaderContextProvider>
  )
}

export const setupMswServer = () => {
  axios.defaults.adapter = require('axios/lib/adapters/http')
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())
}

export const setupTests = () => {
  mockRouter()
  setupMswServer()
}

interface MockRouteOpts {
  route: ValueOf<typeof Endpoints>
  httpStatus: ValueOf<typeof HttpStatus>
  method: 'post' | 'get'
  body?: Record<string, any>
}
export const mockRoute = ({
  httpStatus,
  route,
  body,
  method,
}: MockRouteOpts) => {
  server.use(
    rest[method](`${API}${route}`, async (_req, res, ctx) => {
      if (body) {
        return res(ctx.status(httpStatus), ctx.json(body))
      }
      return res(ctx.status(httpStatus))
    })
  )
}
