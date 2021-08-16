import { ChevronDownIcon } from '@chakra-ui/icons'
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import router from 'next/router'
import React from 'react'
import { Texts } from '../constants/Texts'
import useUser from '../lib/hooks/useUser'

const ProfileMenu = () => {
  const { performLogout, isLoggedIn, getUser } = useUser()
  return (
    <Menu>
      <MenuButton
        as={Button}
        data-testid="profilemenu"
        icon={<ChevronDownIcon />}
        rightIcon={<ChevronDownIcon />}
      >
        {getUser().email}
      </MenuButton>
      <MenuList>
        {!isLoggedIn && (
          <MenuItem onClick={() => router.push('/login')}>
            {Texts.signIn}
          </MenuItem>
        )}
        {isLoggedIn && (
          <div>
            <MenuItem onClick={() => router.push('/profile')}>
              {Texts.profile}
            </MenuItem>
            <MenuItem onClick={performLogout}>{Texts.logout}</MenuItem>
          </div>
        )}
      </MenuList>
    </Menu>
  )
}

export default ProfileMenu
