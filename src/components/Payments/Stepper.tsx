import { Center, Stack } from '@chakra-ui/react'
import { Step, Steps, useSteps } from 'chakra-ui-steps'
import React from 'react'
import { User } from '../../../common/interface/ConsumerResponses'
import useI18n from '../../lib/hooks/useI18n'
import { useUserInfoQuery } from '../../redux/services/serverApi'
import AddressInformation from './AddressInformation'
import ContactInformation from './ContactInformation'
import PaymentInformation from './PaymentInformation'

interface Props {
  user?: User
}

const Stepper = ({ user }: Props) => {
  const { t } = useI18n()
  const { nextStep, prevStep, activeStep, setStep } = useSteps({
    initialStep: 0,
  })
  const { data } = useUserInfoQuery(user?.email || '')

  return (
    <Center my="auto">
      <Stack p="10" w="xl">
        <Steps
          onClickStep={(stepIdx) => {
            if (stepIdx < activeStep) {
              setStep(stepIdx)
            }
          }}
          activeStep={activeStep}
          orientation="vertical"
        >
          <Step label={t.yourContactInformation}>
            <ContactInformation onNext={nextStep} user={data} />
          </Step>
          <Step label={t.deliveryAndBillingAddress}>
            <AddressInformation
              onNext={nextStep}
              onPrevious={prevStep}
              user={data}
            />
          </Step>
          <Step label={t.payment}>
            <PaymentInformation />
          </Step>
        </Steps>
      </Stack>
    </Center>
  )
}

export default Stepper
