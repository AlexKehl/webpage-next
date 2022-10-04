import { CheckIcon } from '@chakra-ui/icons'
import { Center, Stack, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import useI18n from 'src/lib/hooks/useI18n'

const PaymentSuccess = () => {
  const { t } = useI18n()

  useEffect(() => {
    // TODO clear cart
  }, [])

  return (
    <Center my="auto">
      <Stack p={{ base: 10, sm: 20 }} alignItems="center" rounded="md" w="xl">
        <Text fontSize="3xl" color="gray.600">
          {t.paymentsuccess}
        </Text>
        <CheckIcon display="block" mx="auto" w={48} h={48} color="green.500" />
      </Stack>
    </Center>
  )
}

export default PaymentSuccess
