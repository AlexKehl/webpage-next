import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
} from '@chakra-ui/react'
import { capitalize } from 'lodash'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import Categories from '../../common/constants/Categories'
import { Texts } from '../constants/Texts'
import ProfileMenu from './ProfileMenu'

const Header = () => {
  const router = useRouter()

  return (
    <Flex
      justifyContent={'space-between'}
      background={'gray.100'}
      paddingX={'12'}
      paddingY={'2'}
    >
      <div>
        <Button onClick={() => router.push('/')}> Home </Button>
      </div>
      <Stack direction="row">
        <Button onClick={() => router.push('/about')}> About </Button>
        <Menu>
          <MenuButton
            data-testid="gallerymenu"
            as={Button}
            rightIcon={<ChevronDownIcon />}
          >
            {Texts.gallery}
          </MenuButton>
          <MenuList>
            {Categories.map((category, idx) => (
              <MenuItem
                key={idx}
                data-testid="gallerycategory"
                onClick={() => router.push(`/gallery/${category}`)}
              >
                {capitalize(category)}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <ProfileMenu />
      </Stack>
    </Flex>
  )
}

export default Header
