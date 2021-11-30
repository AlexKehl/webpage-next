import { Button, Center, Flex, Stack } from '@chakra-ui/react'
import { Step, Steps, useSteps } from 'chakra-ui-steps'
import React from 'react'
import AddressInformation from './AddressInformation'
import ContactInformation from './ContactInformation'
import PaymentInformation from './PaymentInformation'

const steps = [
  { label: 'Step 1', component: ContactInformation },
  { label: 'Step 2', component: AddressInformation },
  { label: 'Step 3', component: PaymentInformation },
]

const Stepper = () => {
  const { nextStep, prevStep, activeStep } = useSteps({
    initialStep: 0,
  })

  return (
    <Center my="auto">
      <Stack p="10" w="xl">
        <Steps activeStep={activeStep} orientation="vertical">
          {steps.map(({ label, component }) => (
            <Step label={label} key={label}>
              {component({ onNext: nextStep })}
            </Step>
          ))}
        </Steps>
      </Stack>
    </Center>
  )
}

export default Stepper
