import {
  Button,
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
            <a href="http://localhost:3002/auth/steam">login</a>
            <Button
              onClick={() => {
                fetch(
                  'http://localhost:3002/new-api-key?steamid=76561198019416534',
                  {
                    credentials: 'include',
                  }
                )
                  .then((res) => res.json)
                  .then(console.log)
              }}
            >
              logout
            </Button>
            <Button
              onClick={() => {
                fetch('http://localhost:3002/auth/logout', {
                  credentials: 'include',
                })
                  .then((res) => res.json)
                  .then(console.log)
              }}
            >
              logout
            </Button>
            <Button
              onClick={() => {
                fetch('http://localhost:3002/profile', {
                  credentials: 'include',
                })
                  .then((res) => res.json)
                  .then(console.log)
              }}
            >
              profile
            </Button>
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
