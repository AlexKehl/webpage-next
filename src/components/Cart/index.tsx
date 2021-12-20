import { Button, Center, Flex, Stack } from '@chakra-ui/react'
import React from 'react'
import useI18n from '../../lib/hooks/useI18n'
import useLocalStorage from '../../lib/hooks/useLocalStorage'
import useRedirect from '../../lib/hooks/useRedirect'
import useToasts from '../../lib/hooks/useToasts'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { cartActions, cartSelector } from '../../redux/slices/cartSlice'
import { Cart } from '../../types'
import CartItem from './CartItem'

const Cart = () => {
  const { t } = useI18n()
  const dispatch = useAppDispatch()
  const { cart } = useAppSelector(cartSelector)

  useToasts(cartSelector)
  useLocalStorage(cartSelector, 'cart')
  useRedirect(cartSelector)

  if (cart.items.length === 0) {
    return <Center my="auto">{t.yourCartIsEmpty}</Center>
  }

  return (
    <Center m={{ base: 3, sm: 5 }}>
      <span>
        <Stack direction="column" spacing="2">
          {cart.items.map((item, idx) => (
            <CartItem
              key={idx}
              {...item}
              onDelete={(id) => dispatch(cartActions.deleteCartItem(id))}
            />
          ))}
        </Stack>
        <Flex direction="row-reverse">
          <Button m="2" onClick={() => dispatch(cartActions.checkout())}>
            {t.checkout}
          </Button>
        </Flex>
      </span>
    </Center>
  )
}

export default Cart
