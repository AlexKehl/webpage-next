import { Button, GridItem, SimpleGrid } from '@chakra-ui/react'
import { FormProvider } from 'react-hook-form'
import {
  Country,
  FirstName,
  LastName,
  Phone,
} from 'src/components/Form/FormFields'
import useI18n from 'src/lib/hooks/useI18n'
import useContactInformation from '../hooks/useContactInformation'

interface Props {
  onNextStep: () => void
}

const ContactInformation = ({ onNextStep }: Props) => {
  const { t } = useI18n()
  const { formData, onSubmit } = useContactInformation({ onNextStep })

  return (
    <form onSubmit={formData.handleSubmit(onSubmit)}>
      <FormProvider {...formData}>
        <SimpleGrid columns={12} spacing={2}>
          <GridItem colSpan={{ base: 12, sm: 8 }}>
            <FirstName />
          </GridItem>
          <GridItem colSpan={{ base: 12, sm: 4 }}>
            <LastName />
          </GridItem>
          <GridItem colSpan={12}>
            <Country withPhone />
          </GridItem>
          <GridItem colSpan={12}>
            <Phone />
          </GridItem>
          <GridItem colStart={9} colSpan={4}>
            <Button width="100%" type="submit">
              {t.next}
            </Button>
          </GridItem>
        </SimpleGrid>
      </FormProvider>
    </form>
  )
}

export default ContactInformation
