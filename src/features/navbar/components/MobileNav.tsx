import { Stack, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import MobileNavItem from 'src/features/navbar/components/MobileNavItem'
import { getNavItems } from 'src/features/navbar/components/NavItems'
import useI18n from 'src/lib/hooks/useI18n'

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
