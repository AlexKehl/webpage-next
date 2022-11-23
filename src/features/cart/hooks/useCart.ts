import useI18n from 'src/lib/hooks/useI18n'
import useToasts from 'src/lib/hooks/useToasts'
import { trpc } from 'src/utils/Trpc'

const useCart = () => {
  const { t } = useI18n()
  const { showSuccessToast, showErrorToast } = useToasts()
  const utils = trpc.useContext()

  const { mutate: addToCart, isLoading: isCartAddLoading } =
    trpc.cartRouter.add.useMutation({
      onSuccess: () => {
        utils.cartRouter.list.invalidate()
        showSuccessToast(t.cartItemAdded)
      },
      onError: (err) => {
        if (err.data?.code === 'CONFLICT') {
          showErrorToast(t.cartItemIsAlreadyPresent)
          return
        }
        showErrorToast(t.unexpectedError)
      },
    })

  const { data: cart, isLoading: isCartLoading } =
    trpc.cartRouter.list.useQuery(undefined, {
      enabled: false,
      onError: (err) => {
        if (err.data?.code === 'UNAUTHORIZED') {
          showErrorToast(t.loginToViewContent)
        } else {
          showErrorToast(t.unexpectedError)
        }
      },
    })

  const { mutate: deleteFromCart, isLoading: isDeleteLoading } =
    trpc.cartRouter.delete.useMutation({
      onSuccess: () => {
        utils.cartRouter.list.invalidate()
      },
    })

  const { mutate: clearCart } = trpc.cartRouter.clear.useMutation()

  return {
    addToCart,
    cart,
    deleteFromCart,
    clearCart,
    isLoading: [isCartAddLoading, isCartLoading, isDeleteLoading].some(Boolean),
  }
}

export default useCart
