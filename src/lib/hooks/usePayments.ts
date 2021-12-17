import { Endpoints } from '../../../common/constants/Endpoints'
import { GalleryImagePaymentResponse } from '../../../common/interface/ConsumerResponses'
import { API } from '../../constants/EnvProxy'
import { useAppSelector } from '../../redux/hooks'
import { postJSON } from '../api/Utils'
import useApi from './useApi'
import useI18n from './useI18n'
import useToasts from './useToasts'

interface Props {
  onRedirect: (url: string) => void
}

const usePayments = ({ onRedirect }: Props) => {
  const { fetchWithErrHandle } = useApi()
  const { showError } = useToasts()
  const { t } = useI18n()
  const { cart } = useAppSelector((store) => store.cart)

  const buyImages = () => {
    return fetchWithErrHandle<GalleryImagePaymentResponse>({
      fn: () =>
        postJSON({
          url: `${API}${Endpoints.checkout}`,
          data: { ids: cart.items.map((i) => i.id) },
        }),
      onSuccess: ({ redirect }) => onRedirect(redirect),
      default: () => showError({ text: t.serverError }),
    })
  }

  return {
    buyImages,
  }
}

export default usePayments
