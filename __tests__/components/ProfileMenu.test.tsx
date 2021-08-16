import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'
import { asyncTimeout } from '../../common/utils/Functions'
import ProfileMenu from '../../src/components/ProfileMenu'
import { Texts } from '../../src/constants/Texts'

axios.defaults.adapter = require('axios/lib/adapters/http')

it('should logout successfully', async () => {
  const performLogout = jest.fn()
  render(<ProfileMenu isLoggedIn={true} performLogout={performLogout} />)

  userEvent.click(screen.getByTestId('profilemenu'))

  await waitFor(() => {
    userEvent.click(screen.getByRole('menuitem', { name: Texts.logout }))
    expect(performLogout).toHaveBeenCalled()
  })
})
