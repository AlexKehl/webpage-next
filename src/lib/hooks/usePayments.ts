import { useRouter } from 'next/router'
import { Endpoints } from '../../../common/constants/Endpoints'
import HttpStatus from '../../../common/constants/HttpStatus'
import { GalleryImagePaymentResponse } from '../../../common/interface/ConsumerResponses'
import { BuyImageDto } from '../../../common/interface/Dto'
import { API } from '../../constants/EnvProxy'
import useApi from './useApi'
import useI18n from './useI18n'
import useToasts from './useToasts'

const usePayments = () => {
  const { postWithErrHandle } = useApi()
  const { showSuccess, showError } = useToasts()
  const router = useRouter()
  const { t } = useI18n()

  const buyImage = ({ id, price }: BuyImageDto) => {
    return postWithErrHandle<GalleryImagePaymentResponse>({
      params: {
        url: `${API}${Endpoints.checkout}`,
        data: { id, price },
      },
      onSuccess: ({ redirect }) => router.push(redirect),
      default: () => showError({ text: t.serverError }),
    })
  }

  return {
    buyImage,
  }
}

export default usePayments
