import { Stack, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import useI18n from '../../lib/hooks/useI18n'
import MobileNavItem from './MobileNavItem'
import { getNavItems } from './NavItems'

const MobileNav = () => {
  const i18n = useI18n()
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}
    >
      {getNavItems(i18n).map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  )
}

export default MobileNav
