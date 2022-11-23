import { Avatar, AvatarBadge, Text } from '@chakra-ui/react'
import router from 'next/router'
import React, { Fragment } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { trpc } from 'src/utils/Trpc'

const CartIcon = () => {
  const { data: cart } = trpc.cartRouter.list.useQuery()
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
        {(cart?.galleryImages?.length || 0) > 0 && (
          <AvatarBadge boxSize="1.1rem" bg="red.200">
            <Text fontSize="xs">{cart?.galleryImages.length}</Text>
          </AvatarBadge>
        )}
      </Avatar>
    </Fragment>
  )
}

export default CartIcon
