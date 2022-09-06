import {
  Box,
  Flex,
  IconButton,
  Collapse,
  useDisclosure,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import React from 'react'
import MobileNav from './MobileNav'
import DesktopNav from './DesktopNav'
import CartIcon from './CartIcon'
import WithClientRender from '../../../components/HOC/WithClientRender'
import ProfileMenu from './ProfileMenu'

const NavBar = () => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Box>
      <Flex
        bg={'white'}
        color={'gray.600'}
        minH={'60px'}
        py={2}
        px={4}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={'gray.200'}
        align={'center'}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Flex
          w="36"
          mr={{ base: 'none', md: 10 }}
          justifyContent={'space-between'}
          alignItems="center"
        >
          <CartIcon />
          <ProfileMenu />
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  )
}

export default WithClientRender(NavBar)