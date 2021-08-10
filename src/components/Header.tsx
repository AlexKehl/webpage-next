import { ChevronDownIcon } from '@chakra-ui/icons'
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import useUser from '../lib/hooks/useUser'
import Dropdown from './Dropdown'
import { capitalize } from 'lodash'
import Categories from '../../common/constants/Categories'

const Header: FC = () => {
  const router = useRouter()
  const { isLoggedIn, performLogout } = useUser()

  return (
    <div className="flex justify-between bg-gray-100 px-12 py-2">
      <div>
        <Button onClick={() => router.push('/')}> Home </Button>
      </div>
      <div className="flex justify-between space-x-3">
        <Button onClick={() => router.push('/about')}> About </Button>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Gallery
          </MenuButton>
          <MenuList>
            {Categories.map((category, idx) => (
              <MenuItem
                key={idx}
                onClick={() => router.push(`/gallery/${category}`)}
              >
                {capitalize(category)}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        {!isLoggedIn && (
          <Dropdown
            menuItems={[
              {
                value: 'Sign in',
                onClick: () => router.push('/login'),
              },
            ]}
          />
        )}
        {isLoggedIn && (
          <Dropdown
            menuItems={[
              {
                value: 'Profile',
                onClick: () => router.push('/profile'),
              },
              {
                value: 'Logout',
                onClick: performLogout,
              },
            ]}
          />
        )}
      </div>
    </div>
  )
}

export default Header
