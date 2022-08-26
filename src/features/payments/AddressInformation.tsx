import { Button, GridItem, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { AddressInformationDto } from 'common/interface/Dto'
import useI18n from 'src/lib/hooks/useI18n'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import {
  useAddressInformationMutation,
  useCheckoutMutation,
} from 'src/redux/services/serverApi'
import { stepperActions } from 'src/redux/slices/stepperSlice'
import {
  FullName,
  Street,
  StreetNumber,
  City,
  State,
  Zip,
  Country,
} from 'src/components/Form/FormFields'
import { buyImageSelector } from 'src/redux/store'

const AddressInformation = () => {
  const { t } = useI18n()
  const formData = useForm<AddressInformationDto>()
  const dispatch = useAppDispatch()
  const buyImageDto = useAppSelector(buyImageSelector)

  const [updateAddressInformation] = useAddressInformationMutation()
  const [checkout] = useCheckoutMutation()

  const onSubmit = async (addressDto: AddressInformationDto) => {
    dispatch(stepperActions.setAddressData(addressDto))
    await updateAddressInformation(addressDto)
    await checkout(buyImageDto)
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
              width="100%"
              onClick={() => dispatch(stepperActions.prevStep())}
            >
              {t.previous}
            </Button>
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

export default AddressInformation
