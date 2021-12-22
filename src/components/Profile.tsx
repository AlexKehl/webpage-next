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
import useI18n from '../lib/hooks/useI18n'
import { useAppSelector } from '../redux/hooks'
import { userSelector } from '../redux/slices/userSlice'

const ProfilePage = () => {
  const { t } = useI18n()
  const { user } = useAppSelector(userSelector)
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
              <Td>{t.email}</Td>
              <Td>{user?.email}</Td>
            </Tr>
            <Tr>
              <Td>{t.status}</Td>
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

export default ProfilePage
