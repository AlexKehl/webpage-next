import { Button, GridItem, SimpleGrid } from '@chakra-ui/react'
import { FormProvider, useForm } from 'react-hook-form'
import {
  Country,
  FirstName,
  LastName,
  Phone,
} from 'src/components/Form/FormFields'
import useI18n from 'src/lib/hooks/useI18n'
import {
  contactInformationInput,
  ContactInformationInput,
} from '../../validators'
import { zodResolver } from '@hookform/resolvers/zod'
import useContactInformation from './useContactInformation'

interface Props extends ReturnType<typeof useContactInformation> {}

const ContactInformation = ({ onSubmit }: Props) => {
  const { t } = useI18n()

  const formData = useForm<ContactInformationInput>({
    resolver: zodResolver(contactInformationInput),
  })

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
