import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { Endpoints } from '../../common/constants/Endpoints'
import HttpStatus from '../../common/constants/HttpStatus'
import ConfirmEmail from '../../src/components/ConfirmEmailResult'
import * as nextRouter from 'next/router'
import en from '../../src/locales/en'
import { setupMswServer, mockRoute } from '../utils/Setup'

// @ts-ignore
nextRouter.useRouter = jest.fn()
// @ts-ignore
nextRouter.useRouter.mockReturnValue({
  query: {
    token: 'fooToken',
  },
})

setupMswServer()

it('shows success text on successfull email confirm', async () => {
  render(<ConfirmEmail />)

  mockRoute({
    route: Endpoints.emailConfirm,
    httpStatus: HttpStatus.OK,
    method: 'post',
  })

  await waitFor(() => {
    expect(screen.getByText(en.emailConfirmSuccess)).toBeInTheDocument()
  })
})

it('shows error text on failed email confirm', async () => {
  render(<ConfirmEmail />)

  mockRoute({
    route: Endpoints.emailConfirm,
    httpStatus: HttpStatus.BAD_REQUEST,
    method: 'post',
  })

  await waitFor(() => {
    expect(screen.getByText(en.emailConfirmFail)).toBeInTheDocument()
  })
})

it('shows error text if token is missing', async () => {
  // @ts-ignore
  nextRouter.useRouter.mockReturnValue({
    query: {},
  })
  render(<ConfirmEmail />)

  mockRoute({
    route: Endpoints.emailConfirm,
    httpStatus: HttpStatus.BAD_REQUEST,
    method: 'post',
  })

  await waitFor(() => {
    expect(screen.getByText(en.emailConfirmFail)).toBeInTheDocument()
  })
})
