import { Button, Flex, Stack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Endpoints } from '../../../common/constants/Endpoints'
import HttpStatus from '../../../common/constants/HttpStatus'
import { User } from '../../../common/interface/ConsumerResponses'
import { ContactInformationDto } from '../../../common/interface/Dto'
import { API } from '../../constants/EnvProxy'
import { apiGet, postJSON } from '../../lib/api/Utils'
import useApi from '../../lib/hooks/useApi'
import useI18n from '../../lib/hooks/useI18n'
import useToasts from '../../lib/hooks/useToasts'
import { useAppDispatch } from '../../redux/hooks'
import { paymentActions } from '../../redux/slices/paymentSlice'
import EmailField from '../EmailField'
import CountrySelect from '../Form/CountrySelect'
import FirstName from '../Form/FirstName'
import LastName from '../Form/LastName'
import Phone from '../Form/Phone'

interface Props {
  onNext: () => void
  user?: User
}

const ContactInformation = ({ onNext, user }: Props) => {
  const formData = useForm<ContactInformationDto>({
    defaultValues: { countryCode: 'DE' },
  })
  const { t } = useI18n()
  const dispatch = useAppDispatch()
  const { fetchWithErrHandle } = useApi()
  const { showError } = useToasts()

  useEffect(() => {
    if (!user?.email) {
      return
    }
    apiGet<ContactInformationDto>({
      url: `${API}${Endpoints.user}`,
      params: { email: user?.email },
      credentials: 'include',
    })
      .then(formData.reset)
      .catch(() => {})
  }, [])

  const onSubmit = (data: ContactInformationDto) => {
    return fetchWithErrHandle({
      fn: () =>
        postJSON({
          url: `${API}${Endpoints.contactInformation}`,
          data,
          credentials: 'include',
        }),
      onSuccess: () => {
        dispatch(paymentActions.setContactData(data))
        onNext()
      },
      [HttpStatus.NOT_FOUND]: () => showError({ text: t.userNotRegistered }),
      [HttpStatus.UNAUTHORIZED]: () => showError({ text: t.sessionExpired }),
      default: () => showError({ text: t.unexpectedError }),
    })
  }

  return (
    <form onSubmit={formData.handleSubmit(onSubmit)} noValidate>
      <FormProvider {...formData}>
        <Stack py={4}>
          <EmailField />
          <FirstName />
          <LastName />
          <CountrySelect />
          <Phone />
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
