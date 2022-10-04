import { useMutation, useQuery } from 'src/utils/Trpc'
import { ContactInformationInput } from '../validators'

interface Props {
  onNextStep: () => void
  formData: any
}

const useContactInformation = ({ onNextStep, formData }: Props) => {
  const { mutate: updateContactInformation } = useMutation(
    'checkout.updateContactInformation',
    {
      onSuccess: () => {
        onNextStep()
      },
    }
  )
  useQuery(['checkout.getContactInformation'], { onSuccess: formData.reset })

  const onSubmit = async (contactData: ContactInformationInput) => {
    updateContactInformation(contactData)
  }

  return { formData, onSubmit }
}

export default useContactInformation
