import { Center, Stack } from '@chakra-ui/react'
import { Step, Steps, useSteps } from 'chakra-ui-steps'
import React from 'react'
import { useQuery } from 'react-query'
import { User } from '../../../common/interface/ConsumerResponses'
import { fetchUserInfo } from '../../lib/api/User'
import useI18n, { I18n } from '../../lib/hooks/useI18n'
import AddressInformation from './AddressInformation'
import ContactInformation from './ContactInformation'
import PaymentInformation from './PaymentInformation'

const getSteps = (t: I18n) => [
  { label: t.yourContactInformation, component: ContactInformation },
  { label: t.deliveryAndBillingAddress, component: AddressInformation },
  { label: t.payment, component: PaymentInformation },
]

interface Props {
  user?: User
}

const Stepper = ({ user }: Props) => {
  const { t } = useI18n()
  const { nextStep, prevStep, activeStep } = useSteps({
    initialStep: 0,
  })

  const { data } = useQuery('userInfo', async () => {
    if (!user?.email) return
    return fetchUserInfo(user?.email)
  })

  return (
    <Center my="auto">
      <Stack p="10" w="xl">
        <Steps activeStep={activeStep} orientation="vertical">
          {getSteps(t).map(({ label, component }) => (
            <Step label={label} key={label}>
              {component({
                onNext: nextStep,
                onPrevious: prevStep,
                user: data,
              })}
            </Step>
          ))}
        </Steps>
      </Stack>
    </Center>
  )
}

export default Stepper
