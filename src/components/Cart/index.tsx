import { Fragment } from 'react'
import useCart from '../../lib/hooks/useCart'
import WithHeader from '../HOC/WithHeader'
import CartComponent from './CartComponent'
import CartItem from './CartItem'

const Cart = () => {
  const { cart, deleteItem } = useCart()

  return <CartComponent cart={cart} deleteItem={deleteItem} />
}

export default WithHeader(Cart)
