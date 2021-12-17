import { Button, GridItem, SimpleGrid } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { ContactInformationDto } from '../../../common/interface/Dto'
import useI18n from '../../lib/hooks/useI18n'
import useLoader from '../../lib/hooks/useLoader'
import useToasts from '../../lib/hooks/useToasts'
import { useAppSelector } from '../../redux/hooks'
import { useContactInformationMutation } from '../../redux/services/serverApi'
import { stepperSelector } from '../../redux/slices/stepperSlice'
import EmailField from '../EmailField'
import { FirstName, LastName, Country, Phone } from '../Form/FormFields'

const ContactInformation = () => {
  const stepperState = useAppSelector(stepperSelector)
  const formData = useForm<ContactInformationDto>()
  const { t } = useI18n()
  const [updateContactInformation] = useContactInformationMutation()

  useToasts(stepperSelector)
  useLoader(stepperSelector)

  useEffect(() => {
    formData.reset({
      ...stepperState.user?.contact,
      email: stepperState.user?.email || '',
      countryCode: stepperState.user?.contact?.countryCode || 'DE',
    })
  }, [stepperState.user])

  return (
    <form onSubmit={formData.handleSubmit(updateContactInformation)} noValidate>
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
            <Country withPhone />
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
