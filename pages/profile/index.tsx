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
import { useSession } from 'next-auth/react'
import React from 'react'
import useI18n from 'src/lib/hooks/useI18n'

const ProfilePage = () => {
  const { t } = useI18n()
  const { data: session } = useSession()
  return (
    <Center h="100vh">
      <Stack boxShadow="xl" p="10">
        <Table variant="striped">
          <Thead>
            <Text fontSize="2xl" p="4">
              Profile
            </Text>
            <br />
          </Thead>
          <Tbody>
            <Tr>
              <Td>{t.email}</Td>
              <Td>{session?.user?.email}</Td>
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
