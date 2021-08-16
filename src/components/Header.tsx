import { ChevronDownIcon } from '@chakra-ui/icons'
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { capitalize } from 'lodash'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import Categories from '../../common/constants/Categories'
import useUser from '../lib/hooks/useUser'
import ProfileMenu from './ProfileMenu'

const Header: FC = () => {
  const router = useRouter()

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
        <ProfileMenu />
      </div>
    </div>
  )
}

export default Header
