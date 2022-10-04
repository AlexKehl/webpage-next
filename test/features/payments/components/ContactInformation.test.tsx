import ContactInformation from 'src/features/payments/components/ContactInformation'
import { render } from '@testing-library/react'
import React from 'react'
import { mockRouter } from 'test/utils/Setup'

mockRouter()

describe('ContactInformation', () => {
  it('canary', async () => {
    const { debug } = render(<ContactInformation onNextStep={() => {}} />)

    // await userEvent.click(screen.getByText(en.next))

    debug()
  })
})
