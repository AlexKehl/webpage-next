import { ChevronDownIcon } from '@chakra-ui/icons'
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import router from 'next/router'
import React from 'react'
import useI18n from '../lib/hooks/useI18n'
import useUser from '../lib/hooks/useUser'

const ProfileMenu = () => {
  const { t } = useI18n()
  const { performLogout, isLoggedIn, getUser } = useUser()
  return (
    <Menu>
      <MenuButton
        as={Button}
        data-testid="profilemenu"
        icon={<ChevronDownIcon />}
        rightIcon={<ChevronDownIcon />}
      >
        {getUser().email || t.profile}
      </MenuButton>
      <MenuList>
        {!isLoggedIn && (
          <MenuItem onClick={() => router.push('/login')}>{t.signIn}</MenuItem>
        )}
        {isLoggedIn && (
          <div>
            <MenuItem onClick={() => router.push('/profile')}>
              {t.profile}
            </MenuItem>
            <MenuItem onClick={performLogout}>{t.logout}</MenuItem>
          </div>
        )}
      </MenuList>
    </Menu>
  )
}

export default ProfileMenu
