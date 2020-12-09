import React from 'react'
import LoginForm from 'components/LoginForm'
import { render, fireEvent } from '@testing-library/react'

describe('Home page', () => {
  // it('matches snapshot', () => {
  //   const { asFragment } = render(<Home />, {})
  //   expect(asFragment()).toMatchSnapshot()
  // })

  it('clicking button triggers alert', () => {
    const { getByTestId } = render(<LoginForm />, {})
    // console.log(getByTestId('signInButton'))

    // window.alert = jest.fn()
    // fireEvent.click(getByText('Test Button'))
    // expect(window.alert).toHaveBeenCalledWith('With typescript and Jest')
  })
})
