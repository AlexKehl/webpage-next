import { Center, Stack } from '@chakra-ui/react'
import { Step, Steps } from 'chakra-ui-steps'
import React, { useState } from 'react'
import WithAuth from 'src/components/HOC/WithAuth'
import useI18n from 'src/lib/hooks/useI18n'
import AddressInformation from './AddressInformation'
import ContactInformation from './ContactInformation'

const Stepper = () => {
  const { t } = useI18n()
  const [activeStep, setActiveStep] = useState(0)

  return (
    <Center my="auto">
      <Stack p="10" w="xl">
        <Steps
          onClickStep={setActiveStep}
          activeStep={activeStep}
          orientation="vertical"
        >
          <Step label={t.yourContactInformation}>
            <ContactInformation
              onNextStep={() => setActiveStep(activeStep + 1)}
            />
          </Step>
          <Step label={t.deliveryAndBillingAddress}>
            <AddressInformation
              onPrevStep={() => setActiveStep(activeStep - 1)}
            />
          </Step>
        </Steps>
      </Stack>
    </Center>
  )
}

export default WithAuth(Stepper)
