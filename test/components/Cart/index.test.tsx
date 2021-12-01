import React from 'react'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { galleryImageDto } from '../../../common/fixtures/GalleryImages'
import TestIds from '../../../src/constants/TestIds'
import { emptyCart, testCart } from './Fixtures'
import { mockRoute, renderWithContext, setupTests } from '../../utils/Setup'
import CartComponent from '../../../src/components/Cart'
import en from '../../../src/locales/en'
import { Endpoints } from '../../../common/constants/Endpoints'
import HttpStatus from '../../../common/constants/HttpStatus'
import { configureStore } from '@reduxjs/toolkit'
import cartSlice from '../../../src/redux/slices/cartSlice'

setupTests()

const setup = ({ cartFromLocalStorage = testCart } = {}) => {
  const setCartInLocalStorage = jest.fn()
  const onRedirect = jest.fn()
  renderWithContext(
    <CartComponent
      setCartInLocalStorage={setCartInLocalStorage}
      onRedirect={onRedirect}
    />,
    {
      //@ts-ignore
      store: configureStore({
        reducer: { cart: cartSlice },
        preloadedState: { cart: { cart: cartFromLocalStorage } },
      }),
    }
  )
  const deleteCartItem = screen.queryByTestId(TestIds.deleteCartItem)
  const checkoutBtn = screen.queryByRole('button', { name: en.checkout })
  return {
    setCartInLocalStorage,
    deleteCartItem,
    checkoutBtn,
    onRedirect,
  }
}

it('renders given cart items', async () => {
  const { checkoutBtn } = setup({ cartFromLocalStorage: testCart })

  await waitFor(() => {
    expect(screen.queryByText(galleryImageDto.name)).toBeInTheDocument()
    expect(screen.queryByText(galleryImageDto.description!)).toBeInTheDocument()
    expect(checkoutBtn).toBeInTheDocument()
  })
})

it('removes item on item delete click', async () => {
  const { setCartInLocalStorage, deleteCartItem, checkoutBtn } = setup({
    cartFromLocalStorage: testCart,
  })

  userEvent.click(deleteCartItem!)

  await waitFor(() => {
    expect(screen.queryByText(galleryImageDto.name)).toBeNull()
    expect(setCartInLocalStorage).toHaveBeenCalledWith(emptyCart)
    expect(checkoutBtn).not.toBeInTheDocument()
    expect(screen.queryByText(en.yourCartIsEmpty)).toBeInTheDocument()
  })
})

it('shows empty text if no items are in cart', () => {
  const { checkoutBtn } = setup({ cartFromLocalStorage: { items: [] } })

  expect(screen.queryByText(en.yourCartIsEmpty)).toBeInTheDocument()
  expect(checkoutBtn).not.toBeInTheDocument()
})

it('calls redirect fn with ids of images on checkout click', async () => {
  mockRoute({
    route: Endpoints.checkout,
    method: 'post',
    httpStatus: HttpStatus.OK,
    body: { success: true, redirect: 'someRoute' },
  })
  const { onRedirect, checkoutBtn } = setup({ cartFromLocalStorage: testCart })

  userEvent.click(checkoutBtn!)

  await waitFor(() => {
    expect(onRedirect).toHaveBeenCalledTimes(1)
    expect(onRedirect).toHaveBeenCalledWith('someRoute')
  })
})

it('shows an error if buyImages fails', async () => {
  mockRoute({
    route: Endpoints.checkout,
    method: 'post',
    httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
    body: { success: false },
  })
  const { onRedirect, checkoutBtn } = setup({ cartFromLocalStorage: testCart })

  userEvent.click(checkoutBtn!)

  await waitFor(() => {
    expect(onRedirect).not.toHaveBeenCalled()
    expect(screen.getByText(en.serverError)).toBeInTheDocument()
  })
})
