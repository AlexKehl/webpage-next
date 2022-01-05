import { Text, Box, Stack, useColorModeValue, Button } from '@chakra-ui/react'
import React from 'react'
import { NavItem } from 'src/features/navbar/components/NavItems'

const DesktopSubNav = ({ label, onClick, subLabel }: NavItem) => {
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}
    >
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'pink.400' }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
      </Stack>
    </Button>
  )
}

export default DesktopSubNav
