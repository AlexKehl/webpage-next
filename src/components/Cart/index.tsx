import { Button, Center } from '@chakra-ui/react'
import React, { Fragment } from 'react'
import useCart from '../../lib/hooks/useCart'
import useI18n from '../../lib/hooks/useI18n'
import usePayments from '../../lib/hooks/usePayments'
import { Cart } from '../../types'
import CartItem from './CartItem'

interface Props {
  cartFromLocalStorage?: Cart
  setCartInLocalStorage: (cart: Cart) => void
  onRedirect: (url: string) => void
}

const Cart = (props: Props) => {
  const { t } = useI18n()
  const { cart, deleteItem } = useCart(props)
  const { buyImages } = usePayments({ onRedirect: props.onRedirect })

  if (cart.items.length === 0) {
    return <Center my="auto">{t.yourCartIsEmpty}</Center>
  }

  const onCheckout = () => buyImages({ ids: cart.items.map((i) => i.id) })

  return (
    <Fragment>
      {cart.items.map((item, idx) => (
        <CartItem key={idx} {...item} onDelete={deleteItem} />
      ))}
      <Button onClick={onCheckout}>{t.checkout}</Button>
    </Fragment>
  )
}

export default Cart
