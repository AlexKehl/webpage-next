import { Avatar, AvatarBadge, IconButton, Text } from '@chakra-ui/react'
import router from 'next/router'
import React from 'react'
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
    <Avatar
      as="button"
      aria-label="notifications"
      icon={<AiOutlineShoppingCart />}
      size="sm"
      onClick={() => router.push('/cart')}
      bg="gray.100"
    >
      <AvatarBadge boxSize="1.1rem" bg="red.400">
        <Text fontSize="xs">{cart.items.length}</Text>
      </AvatarBadge>
    </Avatar>
  )
}

export default CartIcon
