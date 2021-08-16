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
import React, { FC } from 'react'
import WithHeader from '../../src/components/HOC/WithHeader'
import { Texts } from '../../src/constants/Texts'
import useUser from '../../src/lib/hooks/useUser'

const ProfilePage: FC = () => {
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
