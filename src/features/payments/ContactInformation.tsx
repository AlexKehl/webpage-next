import { Button, GridItem, SimpleGrid } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { ContactInformationDto } from 'common/interface/Dto'
import {
  FirstName,
  LastName,
  Country,
  Phone,
} from 'src/components/Form/FormFields'
import useI18n from 'src/lib/hooks/useI18n'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import { useContactInformationMutation } from 'src/redux/services/serverApi'
import { stepperActions, stepperSelector } from 'src/redux/slices/stepperSlice'
import { User } from 'common/interface/ConsumerResponses'

const ContactInformation = () => {
  const stepperState = useAppSelector(stepperSelector)
  const dispatch = useAppDispatch()
  const formData = useForm<ContactInformationDto>()
  const { t } = useI18n()
  const [updateContactInformation] = useContactInformationMutation()

  useEffect(() => {
    formData.reset({
      ...stepperState.user?.contact,
      countryCode: stepperState.user?.contact?.countryCode || 'DE',
    })
  }, [stepperState.user])

  const onSubmit = (contactData: User['contact']) => {
    dispatch(stepperActions.setContactData(contactData))
    updateContactInformation(contactData)
  }

  return (
    <form onSubmit={formData.handleSubmit(onSubmit)} noValidate>
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
