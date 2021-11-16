import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { galleryImageDto } from '../../../common/fixtures/GalleryImages'
import TestIds from '../../../src/constants/TestIds'
import { testCart } from './Fixtures'
import { renderWithContext } from '../../utils/Setup'
import Cart from '../../../src/components/Cart'

const setup = () => {
  return renderWithContext(<Cart />)
}

it('gets removed on delete click', async () => {
  // localStorage.getItem = jest.fn(() => JSON.stringify(testCart))
  // userEvent.click(component.getByTestId(TestIds.deleteCartItem))
  //
  // await waitFor(() => {
  //   expect(screen.queryByText(galleryImageDto.name)).toBeNull()
  // })
})
