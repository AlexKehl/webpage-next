import useI18n from 'src/lib/hooks/useI18n'
import useToasts from 'src/lib/hooks/useToasts'
import { useContext, useMutation, useQuery } from 'src/utils/Trpc'

const useCart = () => {
  const { t } = useI18n()
  const { showSuccessToast, showErrorToast } = useToasts()
  const { invalidateQueries } = useContext()

  const { mutate: addToCart, isLoading: isCartAddLoading } = useMutation(
    'cart.add',
    {
      onSuccess: () => {
        invalidateQueries(['cart.list'])
        showSuccessToast(t.cartItemAdded)
      },
      onError: (err) => {
        if (err.data?.code === 'CONFLICT') {
          showErrorToast(t.cartItemIsAlreadyPresent)
          return
        }
        showErrorToast(t.unexpectedError)
      },
    }
  )

  const { data: cart, isLoading: isCartLoading } = useQuery(['cart.list'], {
    enabled: false,
    onError: (err) => {
      if (err.data?.code === 'UNAUTHORIZED') {
        showErrorToast(t.loginToViewContent)
      } else {
        showErrorToast(t.unexpectedError)
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

  const { mutate: clearCart } = useMutation('cart.clear')

  return {
    addToCart,
    cart,
    deleteFromCart,
    clearCart,
    isLoading: [isCartAddLoading, isCartLoading, isDeleteLoading].some(Boolean),
  }
}

export default useCart
