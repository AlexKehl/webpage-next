import React, { useState, useEffect } from 'react'
import { Endpoints } from '../../../common/constants/Endpoints'
import { API } from '../../constants/EnvProxy'

const ProductDisplay = () => (
  <section>
    <div>
      <img
        src="https://i.imgur.com/EHyR2nP.png"
        alt="The cover of Stubborn Attachments"
      />
      <div>
        <h3>Stubborn Attachments</h3>
        <h5>$20.00</h5>
      </div>
    </div>
    <form action={`${API}${Endpoints.checkout}`} method="POST">
      <button type="submit">Checkout</button>
    </form>
  </section>
)

const Message = ({ message }: { message: string }) => (
  <section>
    <p>{message}</p>
  </section>
)

export default function Payments() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search)

    if (query.get('success')) {
      setMessage('Order placed! You will receive an email confirmation.')
    }

    if (query.get('canceled')) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      )
    }
  }, [])

  return message ? <Message message={message} /> : <ProductDisplay />
}
