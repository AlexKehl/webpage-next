import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { Endpoints } from '../../common/constants/Endpoints'
import HttpStatus from '../../common/constants/HttpStatus'
import ConfirmEmail from '../../src/components/ConfirmEmailResult'
import en from '../../src/locales/en'
import { mockRoute, mockRouter, setupMswServer } from '../utils/Setup'

mockRouter({
  query: {
    token: 'fooToken',
  },
})
setupMswServer()

it('shows success text on successfull email confirm', async () => {
  mockRoute({
    route: Endpoints.emailConfirm,
    httpStatus: HttpStatus.OK,
    method: 'post',
    body: {},
  })
  render(<ConfirmEmail />)

  await waitFor(() => {
    expect(screen.getByText(en.emailConfirmSuccess)).toBeInTheDocument()
  })
})

it('shows error text on failed email confirm', async () => {
  mockRoute({
    route: Endpoints.emailConfirm,
    httpStatus: HttpStatus.BAD_REQUEST,
    method: 'post',
  })
  render(<ConfirmEmail />)

  await waitFor(() => {
    expect(screen.getByText(en.emailConfirmFail)).toBeInTheDocument()
  })
})

it('shows error text if token is missing', async () => {
  mockRouter()

  mockRoute({
    route: Endpoints.emailConfirm,
    httpStatus: HttpStatus.BAD_REQUEST,
    method: 'post',
  })
  render(<ConfirmEmail />)

  await waitFor(() => {
    expect(screen.getByText(en.emailConfirmFail)).toBeInTheDocument()
  })
})
