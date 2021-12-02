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
import { Provider } from 'react-redux'
import { store as defaultStore } from '../../src/redux/store'

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

export const renderWithContext = (
  component: JSX.Element,
  { store = defaultStore } = {}
) => {
  return render(
    <Provider store={store}>
      <FullPageLoaderContextProvider>{component}</FullPageLoaderContextProvider>
    </Provider>
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
  const requestBodyListener = jest.fn()
  server.use(
    rest[method](`${API}${route}`, async (req, res, ctx) => {
      requestBodyListener(req.body)
      if (body) {
        return res(ctx.status(httpStatus), ctx.json(body))
      }
      return res(ctx.status(httpStatus))
    })
  )
  return requestBodyListener
}
