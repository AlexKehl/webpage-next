import { Button, GridItem, SimpleGrid } from '@chakra-ui/react'
import router from 'next/router'
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import HttpStatus from '../../../common/constants/HttpStatus'
import { User } from '../../../common/interface/ConsumerResponses'
import { AddressInformationDto } from '../../../common/interface/Dto'
import { updateAddressInformation } from '../../lib/api/User'
import useApi from '../../lib/hooks/useApi'
import useI18n from '../../lib/hooks/useI18n'
import usePayments from '../../lib/hooks/usePayments'
import useToasts from '../../lib/hooks/useToasts'
import { useAppDispatch } from '../../redux/hooks'
import { stepperActions } from '../../redux/slices/stepperSlice'
import {
  City,
  Country,
  FullName,
  State,
  Street,
  StreetNumber,
  Zip,
} from '../Form/FormFields'

const AddressInformation = () => {
  const { t } = useI18n()
  const formData = useForm<AddressInformationDto>()
  const dispatch = useAppDispatch()

  const { fetchWithErrHandle } = useApi()
  const { showError } = useToasts()
  const { buyImages } = usePayments({ onRedirect: router.push })

  const onSubmit = (data: AddressInformationDto) => {
    return fetchWithErrHandle({
      fn: () => updateAddressInformation(data),
      onSuccess: () => buyImages(),
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
            <Button
              isFullWidth
              onClick={() => dispatch(stepperActions.prevStep())}
            >
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
