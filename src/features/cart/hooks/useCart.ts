import { useToast } from '@chakra-ui/react'
import useI18n from 'src/lib/hooks/useI18n'
import { useContext, useMutation, useQuery } from 'src/utils/Trpc'

const useCart = () => {
  const { t } = useI18n()
  const toast = useToast()
  const { invalidateQueries } = useContext()

  const { mutate: addToCart, isLoading: isCartAddLoading } = useMutation(
    'cart.add',
    {
      onSuccess: () => {
        toast({
          description: t.cartItemAdded,
          status: 'success',
          isClosable: true,
        })
      },
      onError: (err) => {
        if (err.data?.code === 'CONFLICT') {
          toast({
            description: t.cartItemIsAlreadyPresent,
            status: 'error',
            isClosable: true,
          })
          return
        }
        toast({
          description: t.unexpectedError,
          status: 'error',
          isClosable: true,
        })
      },
    }
  )

  const { data: cart, isLoading: isCartLoading } = useQuery(['cart.list'], {
    onError: (err) => {
      console.log(err.data?.code)
      if (err.data?.code === 'UNAUTHORIZED') {
        toast({
          description: t.loginToViewContent,
          status: 'error',
          isClosable: true,
        })
      } else {
        toast({
          description: t.unexpectedError,
          status: 'error',
          isClosable: true,
        })
      }
    },
  })

  const { mutate: deleteFromCart, isLoading: isDeleteLoading } = useMutation(
    'cart.delete',
    {
      onSuccess: () => {
        invalidateQueries('cart.list')
      },
    }
  )

  return {
    addToCart,
    cart,
    deleteFromCart,
    isLoading: [isCartAddLoading, isCartLoading, isDeleteLoading].some(Boolean),
  }
}

export default useCart
