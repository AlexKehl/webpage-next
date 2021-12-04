import { Button, GridItem, SimpleGrid } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import HttpStatus from '../../../common/constants/HttpStatus'
import { User } from '../../../common/interface/ConsumerResponses'
import { AddressInformationDto } from '../../../common/interface/Dto'
import { updateAddressInformation } from '../../lib/api/User'
import useApi from '../../lib/hooks/useApi'
import useI18n from '../../lib/hooks/useI18n'
import useToasts from '../../lib/hooks/useToasts'
import {
  City,
  Country,
  FullName,
  State,
  Street,
  StreetNumber,
  Zip,
} from '../Form/FormFields'

interface Props {
  onNext: () => void
  onPrevious: () => void
  user?: User
}

const AddressInformation = ({ onPrevious, user, onNext }: Props) => {
  const { t } = useI18n()
  const formData = useForm<AddressInformationDto>()

  const { fetchWithErrHandle } = useApi()
  const { showError } = useToasts()

  useEffect(() => {
    formData.reset(user?.address)
  }, [user])

  const onSubmit = (data: AddressInformationDto) => {
    return fetchWithErrHandle({
      fn: () => updateAddressInformation(data),
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
            <FullName />
          </GridItem>
          <GridItem colSpan={{ base: 12, sm: 8 }}>
            <Street />
          </GridItem>
          <GridItem colSpan={{ base: 12, sm: 4 }}>
            <StreetNumber />
          </GridItem>
          <GridItem colSpan={12}>
            <City />
          </GridItem>
          <GridItem colSpan={12}>
            <State />
          </GridItem>
          <GridItem colSpan={12}>
            <Zip />
          </GridItem>
          <GridItem colSpan={12}>
            <Country />
          </GridItem>
          <GridItem colStart={5} colSpan={4}>
            <Button isFullWidth onClick={onPrevious}>
              {t.previous}
            </Button>
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

export default AddressInformation
