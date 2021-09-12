import {
  Box,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'
import useI18n from '../../lib/hooks/useI18n'
import DesktopSubNav from './DesktopSubNav'
import { getNavItems } from './NavItems'

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200')
  const linkHoverColor = useColorModeValue('gray.800', 'white')
  const popoverContentBgColor = useColorModeValue('white', 'gray.800')

  const i18n = useI18n()

  return (
    <Stack direction={'row'} spacing={4}>
      {getNavItems(i18n).map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom'}>
            <PopoverTrigger>
              <Button
                p={2}
                onClick={navItem.onClick}
                variant="link"
                fontSize={'sm'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Button>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'sm'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'md'}
                maxW={'min'}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  )
}

export default DesktopNav
