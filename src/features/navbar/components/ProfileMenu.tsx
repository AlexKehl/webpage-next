import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
} from '@chakra-ui/react'
import { signIn, signOut, useSession } from 'next-auth/react'
import router from 'next/router'
import React from 'react'
import DesktopSubNav from 'src/features/navbar/components/DesktopSubNav'
import useI18n from 'src/lib/hooks/useI18n'

const ProfileMenu = () => {
  const { t } = useI18n()
  const { data: session, status } = useSession()

  return (
    <Popover trigger={'hover'} placement={'bottom'}>
      <PopoverTrigger>
        <Button
          p={2}
          variant="link"
          fontSize={'sm'}
          fontWeight={500}
          color="gray.600"
          _hover={{
            textDecoration: 'none',
            color: 'gray.800',
          }}
        >
          {session?.user?.email || t.profile}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        border={0}
        boxShadow="sm"
        bg="white"
        p={4}
        rounded="md"
        maxW="min"
      >
        <Stack>
          {status === 'authenticated' ? (
            <DesktopSubNav
              label={t.profile}
              onClick={() => router.push('/profile')}
            />
          ) : (
            <DesktopSubNav label={t.signIn} onClick={() => signIn('cognito')} />
          )}

          {status === 'authenticated' && (
            <DesktopSubNav label={t.logout} onClick={() => signOut()} />
          )}
        </Stack>
      </PopoverContent>
    </Popover>
  )
}

export default ProfileMenu
