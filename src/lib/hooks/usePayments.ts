import { Endpoints } from '../../../common/constants/Endpoints'
import { GalleryImagePaymentResponse } from '../../../common/interface/ConsumerResponses'
import { BuyImageDto } from '../../../common/interface/Dto'
import { API } from '../../constants/EnvProxy'
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

  const buyImages = ({ ids }: BuyImageDto) => {
    return fetchWithErrHandle<GalleryImagePaymentResponse>({
      fn: () =>
        postJSON({
          url: `${API}${Endpoints.checkout}`,
          data: { ids },
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
