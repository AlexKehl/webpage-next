import { Center, Stack } from '@chakra-ui/react'
import { Step, Steps } from 'chakra-ui-steps'
import React from 'react'
import useI18n from 'src/lib/hooks/useI18n'
import { useAppSelector, useAppDispatch } from 'src/redux/hooks'
import { useUserQuery } from 'src/redux/services/serverApi'
import { stepperSelector, stepperActions } from 'src/redux/slices/stepperSlice'
import { userSelector } from 'src/redux/slices/userSlice'
import AddressInformation from './AddressInformation'
import ContactInformation from './ContactInformation'

const Stepper = () => {
  const { t } = useI18n()
  const { activeStep } = useAppSelector(stepperSelector)
  const { user } = useAppSelector(userSelector)
  const dispatch = useAppDispatch()
  useUserQuery(user?.email || '')

  return (
    <Center my="auto">
      <Stack p="10" w="xl">
        <Steps
          onClickStep={(idx) => dispatch(stepperActions.setActiveStep(idx))}
          activeStep={activeStep}
          orientation="vertical"
        >
          <Step label={t.yourContactInformation}>
            <ContactInformation />
          </Step>
          <Step label={t.deliveryAndBillingAddress}>
            <AddressInformation />
          </Step>
        </Steps>
      </Stack>
    </Center>
  )
}

export default Stepper
