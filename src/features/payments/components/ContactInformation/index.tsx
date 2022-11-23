import useContactInformation from './useContactInformation'
import View from './View'
import { ContactInformation } from 'src/types/PrismaProxy'

interface Props {
  onNextStep: () => void
}

const ContactInformation = ({ onNextStep }: Props) => {
  const helper = (formData: any) => (contactInformation: ContactInformation) =>
    formData.reset(contactInformation)

  const { onSubmit } = useContactInformation({
    onNextStep,
    onContactInformation: helper,
  })

  return <View onSubmit={onSubmit} />
}

export default ContactInformation
