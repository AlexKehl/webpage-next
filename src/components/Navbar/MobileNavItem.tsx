import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  useDisclosure,
  useColorModeValue,
  Collapse,
  Flex,
  Icon,
  Stack,
  Button,
} from '@chakra-ui/react'
import React from 'react'
import { NavItem } from './NavItems'

const MobileNavItem = ({ label, children, onClick }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Button variant="ghost" onClick={onClick}>
          {label}
        </Button>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}
        >
          {children &&
            children.map((child) => (
              <Button
                key={child.label}
                py={2}
                variant="ghost"
                onClick={child.onClick}
              >
                {child.label}
              </Button>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  )
}

export default MobileNavItem
