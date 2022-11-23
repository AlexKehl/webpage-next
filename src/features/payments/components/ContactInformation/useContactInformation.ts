import { ContactInformation } from 'src/types/PrismaProxy'
import { trpc } from 'src/utils/Trpc'
import { ContactInformationInput } from '../../validators'

interface Props {
  onNextStep: () => void
  onContactInformation: (val: ContactInformation) => void
}

const useContactInformation = ({ onNextStep, onContactInformation }: Props) => {
  const { mutate: updateContactInformation } =
    trpc.checkoutRouter.updateContactInformation.useMutation({
      onSuccess: () => onNextStep(),
    })
  trpc.checkoutRouter.getContactInformation.useQuery(undefined, {
    onSuccess: onContactInformation,
  })

  const onSubmit = async (contactData: ContactInformationInput) => {
    updateContactInformation(contactData)
  }

  return { onSubmit }
}

export default useContactInformation
