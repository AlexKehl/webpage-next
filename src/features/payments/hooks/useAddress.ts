import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import useI18n from 'src/lib/hooks/useI18n'
import useToasts from 'src/lib/hooks/useToasts'
import { useMutation, useQuery } from 'src/utils/Trpc'
import { addressInput, AddressInput } from '../validators'

const useAddress = () => {
  const { t } = useI18n()
  const { showSuccessToast } = useToasts()
  const formData = useForm<AddressInput>({
    resolver: zodResolver(addressInput),
  })

  useQuery(['checkout.getAddress'], { onSuccess: formData.reset })
  const { mutate: updateAddress } = useMutation(
    'checkout.updateAddressInformation',
    {
      onSuccess: () => {
        showSuccessToast(t.successfullySubmitted)
      },
    }
  )

  const onSubmit = (address: AddressInput) => {
    updateAddress(address)
  }

  return { formData, onSubmit }
}

export default useAddress
