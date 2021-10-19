import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
} from '@chakra-ui/react'
import router from 'next/router'
import React from 'react'
import useI18n from '../lib/hooks/useI18n'
import useLogin from '../lib/hooks/useLogin'
import useUser from '../lib/hooks/useUser'
import DesktopSubNav from './Navbar/DesktopSubNav'

const ProfileMenu = () => {
  const { t } = useI18n()
  const { isLoggedIn, user } = useUser()
  const { performLogout } = useLogin()
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
          {user?.email || t.profile}
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
          {isLoggedIn ? (
            <DesktopSubNav
              label={t.profile}
              onClick={() => router.push('/profile')}
            />
          ) : (
            <DesktopSubNav
              label={t.signIn}
              onClick={() => router.push('/login')}
            />
          )}

          <DesktopSubNav label={t.cart} onClick={() => router.push('/cart')} />
          {isLoggedIn && (
            <DesktopSubNav label={t.logout} onClick={performLogout} />
          )}
        </Stack>
      </PopoverContent>
    </Popover>
  )
}

export default ProfileMenu
