import { waitFor, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { Endpoints } from '../../../common/constants/Endpoints'
import HttpStatus from '../../../common/constants/HttpStatus'
import { contactDto } from '../../../common/fixtures/Dto'
import { userResponse } from '../../../common/fixtures/User'
import ContactInformation from '../../../src/components/Payments/ContactInformation'
import en from '../../../src/locales/en'
import { mockRoute, renderWithContext, setupTests } from '../../utils/Setup'

setupTests()

const setup = (
  overrides: Partial<Parameters<typeof ContactInformation>[0]> = {}
) => {
  const onNext = jest.fn()
  renderWithContext(
    <ContactInformation onNext={onNext} user={overrides?.user} />
  )
  const germanyOption = screen.getByRole('option', { name: /Germany/ })
  return {
    onNext,
    germanyOption,
    email: screen.getByPlaceholderText(en.email),
    firstName: screen.getByPlaceholderText(en.firstName),
    lastName: screen.getByPlaceholderText(en.lastName),
    phone: screen.getByPlaceholderText(en.phone),
    nextBtn: screen.getByRole('button', { name: en.next }),
  }
}

it.only('sets germany as default country', async () => {
  const { germanyOption } = setup()

  await waitFor(() => {
    expect(germanyOption).toBeInTheDocument()
    expect((germanyOption as any).selected).toBe(true)
  })
})

it('validates fields', async () => {
  const { nextBtn } = setup()

  userEvent.click(nextBtn)

  await waitFor(() => {
    expect(screen.getAllByText(en.fieldRequired).length).toBe(3)
    expect(screen.getByText(en.emailRuleFail)).toBeInTheDocument()
  })
})

it('sets default values and submits those to api endpoint', async () => {
  mockRoute({
    route: Endpoints.user,
    method: 'get',
    httpStatus: HttpStatus.OK,
    body: contactDto,
  })

  const contactInformationBody = mockRoute({
    route: Endpoints.contactInformation,
    method: 'post',
    httpStatus: HttpStatus.OK,
    body: { success: true },
  })

  const { nextBtn, email, phone, lastName, firstName } = setup({
    user: userResponse,
  })

  await waitFor(() => {
    expect(email).toHaveValue(contactDto.email)
    expect(phone).toHaveValue(contactDto.phone)
    expect(lastName).toHaveValue(contactDto.lastName)
    expect(firstName).toHaveValue(contactDto.firstName)
  })

  userEvent.click(nextBtn)

  await waitFor(() => {
    expect(contactInformationBody).toHaveBeenCalledWith(contactDto)
    expect(contactInformationBody).toHaveBeenCalledTimes(1)
  })
})

it('shows not registered error', async () => {
  mockRoute({
    route: Endpoints.user,
    method: 'get',
    httpStatus: HttpStatus.OK,
    body: contactDto,
  })
  mockRoute({
    route: Endpoints.contactInformation,
    method: 'post',
    httpStatus: HttpStatus.NOT_FOUND,
    body: { success: false },
  })

  const { nextBtn, email } = setup({ user: userResponse })

  await waitFor(() => {
    expect(email).toHaveValue(contactDto.email)
  })

  userEvent.click(nextBtn)

  await waitFor(() => {
    expect(screen.getByText(en.userNotRegistered)).toBeInTheDocument()
  })
})

it('shows session expired error', async () => {
  mockRoute({
    route: Endpoints.user,
    method: 'get',
    httpStatus: HttpStatus.OK,
    body: contactDto,
  })
  mockRoute({
    route: Endpoints.contactInformation,
    method: 'post',
    httpStatus: HttpStatus.UNAUTHORIZED,
    body: { success: false },
  })

  const { nextBtn, email } = setup({ user: userResponse })

  await waitFor(() => {
    expect(email).toHaveValue(contactDto.email)
  })

  userEvent.click(nextBtn)

  await waitFor(() => {
    expect(screen.getByText(en.sessionExpired)).toBeInTheDocument()
  })
})
