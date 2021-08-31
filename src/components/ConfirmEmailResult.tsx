import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import { Center, Spinner, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import WithHeader from './HOC/WithHeader'
import { Texts } from '../constants/Texts'
import { confirmEmailTokenRequest } from '../lib/api/Register'

type ConfirmationState = 'CONFIRMED' | 'NOT_CONFIRMED' | 'PENDING'

const ConfirmEmail = (): JSX.Element => {
  const { query } = useRouter()
  const [confirmationState, setConfirmationState] =
    useState<ConfirmationState>('PENDING')

  useEffect(() => {
    confirmEmailTokenRequest({ token: query['token'] as string })
      .then(() => setConfirmationState('CONFIRMED'))
      .catch(() => setConfirmationState('NOT_CONFIRMED'))
  }, [query])

  return (
    <div>
      <Center h="80vh">
        <Stack direction="column">
          {confirmationState === 'CONFIRMED' && (
            <div>
              <CheckIcon
                display="block"
                mx="auto"
                w={48}
                h={48}
                color="green.500"
              />
              <Text fontSize="3xl">{Texts.emailConfirmSuccess}</Text>
            </div>
          )}
          {confirmationState === 'NOT_CONFIRMED' && (
            <div>
              <CloseIcon
                display="block"
                mx="auto"
                w={48}
                h={48}
                color="red.500"
              />
              <Text fontSize="3xl">{Texts.emailConfirmFail}</Text>
            </div>
          )}
          {confirmationState === 'PENDING' && (
            <div>
              <Spinner display="block" mx="auto" w={48} h={48} />
              <Text fontSize="3xl">{Texts.awaitingEmailConfirmation}</Text>
            </div>
          )}
        </Stack>
      </Center>
    </div>
  )
}

export default WithHeader(ConfirmEmail)
