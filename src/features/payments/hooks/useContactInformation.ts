import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { trpc } from 'src/utils/Trpc'
import { addressInput, ContactInformationInput } from '../validators'

interface Props {
  onNextStep: () => void
}

const useContactInformation = ({ onNextStep }: Props) => {
  const formData = useForm<ContactInformationInput>({
    resolver: zodResolver(addressInput),
  })
  const { mutate: updateContactInformation } =
    trpc.checkoutRouter.updateContactInformation.useMutation({
      onSuccess: () => onNextStep(),
    })
  trpc.checkoutRouter.getContactInformation.useQuery(undefined, {
    onSuccess: formData.reset,
  })

  const onSubmit = async (contactData: ContactInformationInput) => {
    updateContactInformation(contactData)
  }

  return { onSubmit, formData }
}

export default useContactInformation
