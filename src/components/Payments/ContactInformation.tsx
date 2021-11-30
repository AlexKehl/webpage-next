import { Button, Flex, Stack } from '@chakra-ui/react'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import useI18n from '../../lib/hooks/useI18n'
import EmailField from '../EmailField'
import CountrySelect from '../Form/CountrySelect'
import FirstName from '../Form/FirstName'
import LastName from '../Form/LastName'

interface Props {
  onNext: () => void
}

const ContactInformation = ({ onNext }: Props) => {
  const formData = useForm()
  const { t } = useI18n()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <form onSubmit={formData.handleSubmit(onSubmit)} noValidate>
      <FormProvider {...formData}>
        <Stack py={4}>
          <EmailField />
          <FirstName />
          <LastName />
          <CountrySelect />
          <Flex direction="row-reverse">
            <Button width="16" type="submit">
              {t.next}
            </Button>
          </Flex>
        </Stack>
      </FormProvider>
    </form>
  )
}

export default ContactInformation
