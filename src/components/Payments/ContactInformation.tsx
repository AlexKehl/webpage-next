import { Button, GridItem, SimpleGrid } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import HttpStatus from '../../../common/constants/HttpStatus'
import { User } from '../../../common/interface/ConsumerResponses'
import { ContactInformationDto } from '../../../common/interface/Dto'
import { updateContactInformation } from '../../lib/api/User'
import useApi from '../../lib/hooks/useApi'
import useI18n from '../../lib/hooks/useI18n'
import useToasts from '../../lib/hooks/useToasts'
import EmailField from '../EmailField'
import { FirstName, LastName, Country, Phone } from '../Form/FormFields'

interface Props {
  onNext: () => void
  user?: User
}

const ContactInformation = ({ onNext, user }: Props) => {
  const formData = useForm<ContactInformationDto>()

  useEffect(() => {
    formData.reset({
      countryCode: user?.contact?.countryCode || 'DE',
      email: user?.email || '',
      phone: user?.contact?.phone || '',
      lastName: user?.contact?.lastName || '',
      firstName: user?.contact?.firstName || '',
    })
  }, [user])
  const { t } = useI18n()
  const { fetchWithErrHandle } = useApi()
  const { showError } = useToasts()

  const onSubmit = (data: ContactInformationDto) => {
    return fetchWithErrHandle({
      fn: () => updateContactInformation(data),
      onSuccess: onNext,
      [HttpStatus.NOT_FOUND]: () => showError({ text: t.userNotRegistered }),
      [HttpStatus.UNAUTHORIZED]: () => showError({ text: t.sessionExpired }),
      default: () => showError({ text: t.unexpectedError }),
    })
  }

  return (
    <form onSubmit={formData.handleSubmit(onSubmit)} noValidate>
      <FormProvider {...formData}>
        <SimpleGrid columns={12} spacing={2}>
          <GridItem colSpan={12}>
            <EmailField />
          </GridItem>
          <GridItem colSpan={{ base: 12, sm: 8 }}>
            <FirstName />
          </GridItem>
          <GridItem colSpan={{ base: 12, sm: 4 }}>
            <LastName />
          </GridItem>
          <GridItem colSpan={12}>
            <Country />
          </GridItem>
          <GridItem colSpan={12}>
            <Phone />
          </GridItem>
          <GridItem colStart={9} colSpan={4}>
            <Button isFullWidth type="submit">
              {t.next}
            </Button>
          </GridItem>
        </SimpleGrid>
      </FormProvider>
    </form>
  )
}

export default ContactInformation
