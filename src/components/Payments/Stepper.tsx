import { Center, Stack } from '@chakra-ui/react'
import { Step, Steps } from 'chakra-ui-steps'
import React from 'react'
import { User } from '../../../common/interface/ConsumerResponses'
import useI18n from '../../lib/hooks/useI18n'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { useUserQuery } from '../../redux/services/serverApi'
import {
  stepperActions,
  stepperSelector,
} from '../../redux/slices/stepperSlice'
import AddressInformation from './AddressInformation'
import ContactInformation from './ContactInformation'

interface Props {
  user?: User
}

const Stepper = ({ user }: Props) => {
  const { t } = useI18n()
  const { activeStep } = useAppSelector(stepperSelector)
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
