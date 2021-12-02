import { Avatar, AvatarBadge, Text } from '@chakra-ui/react'
import router from 'next/router'
import React, { Fragment } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import useCart from '../../lib/hooks/useCart'
import { getItem, setItem } from '../../lib/utils/LocalStorage'
import { Cart } from '../../types'

const CartIcon = () => {
  const cartFromLocalStorage = getItem('cart')
  const setCartInLocalStorage = (cart: Cart) => setItem('cart', cart)
  const { cart } = useCart({
    setCartInLocalStorage,
    cartFromLocalStorage,
  })
  return (
    <Fragment>
      <Avatar
        as="button"
        aria-label="notifications"
        icon={<AiOutlineShoppingCart />}
        size="sm"
        onClick={() => router.push('/cart')}
        bg="gray.100"
      >
        {cart.items.length > 0 && (
          <AvatarBadge boxSize="1.1rem" bg="red.200">
            <Text fontSize="xs">{cart.items.length}</Text>
          </AvatarBadge>
        )}
      </Avatar>
    </Fragment>
  )
}

export default CartIcon
