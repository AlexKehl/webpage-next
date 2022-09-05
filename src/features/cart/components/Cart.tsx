import { Button, Center, Flex, Stack } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import CartItem from 'src/features/cart/components/CartItem'
import useI18n from 'src/lib/hooks/useI18n'
import { useContext, useMutation, useQuery } from 'src/utils/Trpc'

const Cart = () => {
  const { t } = useI18n()

  const { invalidateQueries } = useContext()
  const { data: cart } = useQuery(['cart.list'])
  const { mutate: deleteFromCart } = useMutation('cart.delete', {
    onSuccess: () => {
      invalidateQueries('cart.list')
    },
  })

  if (cart?.galleryImages.length === 0) {
    return <Center my="auto">{t.yourCartIsEmpty}</Center>
  }

  return (
    <Center m={{ base: 3, sm: 5 }}>
      <span>
        <Stack direction="column" spacing="2">
          {cart?.galleryImages.map((item, idx) => (
            <CartItem
              key={idx}
              galleryImage={item}
              onDelete={(imageId) => deleteFromCart({ imageId })}
            />
          ))}
        </Stack>
        <Flex direction="row-reverse">
          <Link href="/payments">
            <a>
              <Button m="2">{t.checkout}</Button>
            </a>
          </Link>
        </Flex>
      </span>
    </Center>
  )
}

export default Cart
