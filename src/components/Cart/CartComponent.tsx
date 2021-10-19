import { Fragment } from 'react'
import useCart from '../../lib/hooks/useCart'
import CartItem from './CartItem'

type Props = Pick<ReturnType<typeof useCart>, 'cart' | 'deleteItem'>

const Cart = ({ cart, deleteItem }: Props) => {
  return (
    <Fragment>
      {cart.items.map((item, idx) => (
        <CartItem key={idx} {...item} onDelete={deleteItem} />
      ))}
    </Fragment>
  )
}

export default Cart
