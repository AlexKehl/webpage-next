import {
  Center,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Thead,
  Tr,
} from '@chakra-ui/react'
import React from 'react'
import WithHeader from './HOC/WithHeader'
import { Texts } from '../constants/Texts'
import useUser from '../lib/hooks/useUser'

const ProfilePage = () => {
  const { getUser } = useUser()
  const { email } = getUser()
  return (
    <Center h="100vh">
      <Stack boxShadow="xl" p="10">
        <Table variant="striped">
          <Thead>
            <Text fontSize="2xl" p="4">
              Profile
            </Text>
          </Thead>
          <Tbody>
            <Tr>
              <Td>{Texts.email}</Td>
              <Td>{email}</Td>
            </Tr>
            <Tr>
              <Td>{Texts.status}</Td>
              <Td bg="green.100" rounded="xl">
                {'logged in'}
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Stack>
    </Center>
  )
}

export default WithHeader(ProfilePage)
