import { Button, Center, Flex, Stack } from '@chakra-ui/react'
import Link from 'next/link'
import React, { Fragment } from 'react'
import FullPageLoader from 'src/components/FullPageLoader'
import WithAuth from 'src/components/HOC/WithAuth'
import CartItem from 'src/features/cart/components/CartItem'
import useI18n from 'src/lib/hooks/useI18n'
import useCart from '../hooks/useCart'

const Cart = () => {
  const { t } = useI18n()
  const { cart, deleteFromCart, isLoading } = useCart()

  if (cart?.galleryImages.length === 0) {
    return <Center my="auto">{t.yourCartIsEmpty}</Center>
  }

  return (
    <Fragment>
      <FullPageLoader isLoading={isLoading} />
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
    </Fragment>
  )
}

export default WithAuth(Cart)
