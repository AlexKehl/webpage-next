import { Button, GridItem, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { AddressInformationDto } from '../../../common/interface/Dto'
import useI18n from '../../lib/hooks/useI18n'
import useLoader from '../../lib/hooks/useLoader'
import useRedirect from '../../lib/hooks/useRedirect'
import useToasts from '../../lib/hooks/useToasts'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  useAddressInformationMutation,
  useCheckoutMutation,
} from '../../redux/services/serverApi'
import {
  stepperActions,
  stepperSelector,
} from '../../redux/slices/stepperSlice'
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
  const { cart } = useAppSelector((store) => store.cart)

  const [updateAddressInformation] = useAddressInformationMutation()
  const [checkout] = useCheckoutMutation()

  useToasts(stepperSelector)
  useLoader(stepperSelector)
  useRedirect(stepperSelector)

  const onSubmit = async (addressDto: AddressInformationDto) => {
    await updateAddressInformation(addressDto)
    await checkout(cart)
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
