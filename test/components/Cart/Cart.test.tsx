import React from 'react'
import CartComponent from '../../../src/components/Cart/CartComponent'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { galleryImageDto } from '../../../common/fixtures/GalleryImages'
import TestIds from '../../../src/constants/TestIds'
import { testCart } from './Fixtures'

it('gets removed on delete click', async () => {
  localStorage.getItem = jest.fn(() => JSON.stringify(testCart))
  const component = render(<CartComponent cart={testCart} />)

  userEvent.click(component.getByTestId(TestIds.deleteCartItem))

  await waitFor(() => {
    expect(screen.queryByText(galleryImageDto.name)).toBeNull()
  })
})
