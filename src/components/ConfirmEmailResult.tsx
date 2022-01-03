import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import { Center, Spinner, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import useI18n from '../lib/hooks/useI18n'
import { API } from '../constants/EnvProxy'
import { Endpoints } from 'common/constants/Endpoints'

type ConfirmationState = 'CONFIRMED' | 'NOT_CONFIRMED' | 'PENDING'

const ConfirmEmail = (): JSX.Element => {
  const { t } = useI18n()
  const router = useRouter()
  const [confirmationState, setConfirmationState] =
    useState<ConfirmationState>('PENDING')
  // const { fetchWithErrHandle } = useApi()

  // useEffect(() => {
  //   fetchWithErrHandle({
  //     fn: () =>
  //       postJSON({
  //         url: `${API}${Endpoints.emailConfirm}`,
  //         data: {
  //           token: router.query['token'] as string,
  //         },
  //       }),
  //     onSuccess: () => setConfirmationState('CONFIRMED'),
  //     default: () => setConfirmationState('NOT_CONFIRMED'),
  //   })
  // }, [router.query])

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
              <Text fontSize="3xl">{t.emailConfirmSuccess}</Text>
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
              <Text fontSize="3xl">{t.emailConfirmFail}</Text>
            </div>
          )}
          {confirmationState === 'PENDING' && (
            <div>
              <Spinner display="block" mx="auto" w={48} h={48} />
              <Text fontSize="3xl">{t.awaitingEmailConfirmation}</Text>
            </div>
          )}
        </Stack>
      </Center>
    </div>
  )
}

export default ConfirmEmail
