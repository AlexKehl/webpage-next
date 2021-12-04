import { Button, Center, Flex, Stack, VStack } from '@chakra-ui/react'
import router from 'next/router'
import React, { Fragment } from 'react'
import useCart from '../../lib/hooks/useCart'
import useI18n from '../../lib/hooks/useI18n'
import { Cart } from '../../types'
import CartItem from './CartItem'

interface Props {
  setCartInLocalStorage: (cart: Cart) => void
  onRedirect: (url: string) => void
}

const Cart = (props: Props) => {
  const { t } = useI18n()
  const { cart, deleteItem } = useCart(props)

  if (cart.items.length === 0) {
    return <Center my="auto">{t.yourCartIsEmpty}</Center>
  }

  const onCheckout = () => router.push('/payments')

  return (
    <Center m={{ base: 3, sm: 5 }}>
      <span>
        <Stack direction="column" spacing="2">
          {cart.items.map((item, idx) => (
            <CartItem key={idx} {...item} onDelete={deleteItem} />
          ))}
        </Stack>
        <Flex direction="row-reverse">
          <Button m="2" onClick={onCheckout}>
            {t.checkout}
          </Button>
        </Flex>
      </span>
    </Center>
  )
}

export default Cart
