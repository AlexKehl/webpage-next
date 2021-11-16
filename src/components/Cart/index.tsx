import React, { Fragment } from 'react'
import useCart from '../../lib/hooks/useCart'
import CartItem from './CartItem'

const Cart = () => {
  const { cart, deleteItem } = useCart()

  return (
    <Fragment>
      {cart.items.map((item, idx) => (
        <CartItem key={idx} {...item} onDelete={deleteItem} />
      ))}
    </Fragment>
  )
}

export default Cart
