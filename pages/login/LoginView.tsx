import React, { ChangeEventHandler, FC, FormEventHandler } from 'react'
import Alert from '../../src/components/Alert'
import WithHeader from '../../src/components/HOC/WithHeader'
import {
  Center,
  Stack,
  Image,
  Heading,
  Text,
  Button,
  Input,
  Checkbox,
} from '@chakra-ui/react'

interface Props {
  onSubmit: FormEventHandler<HTMLFormElement>
  hasFalseCredentials: boolean
  updateFormData: ChangeEventHandler<HTMLInputElement>
}

const LoginForm: FC<Props> = ({
  onSubmit,
  hasFalseCredentials,
  updateFormData,
}) => {
  return (
    <Center h="100vh">
      <Stack boxShadow="xl" p="20" rounded="md">
        <Image src="/logo.jpg" maxW="170px" mb="8" mx="auto"></Image>
        <Heading as="h1"> Log in.</Heading>
        <Text fontSize="lg" color="gray.600">
          Please log in with the data you entered during registration.
        </Text>

        <form onSubmit={onSubmit}>
          <Stack my="4" spacing="6">
            <Input
              id="email"
              type="email"
              placeholder="Email"
              onChange={updateFormData}
            />
            <Input
              id="password"
              type="password"
              placeholder="Password"
              onChange={updateFormData}
            />
            {hasFalseCredentials && (
              <Alert text={'Wrong credentials entered'} />
            )}
            <Checkbox colorScheme="purple">Keep me logged in</Checkbox>
            <Button size="lg" colorScheme="purple" type="submit">
              Login
            </Button>
          </Stack>
        </form>

        <Stack justify="center" color="gray.600" spacing="3">
          <Text as="div" textAlign="center">
            <span>Don't have an account?</span>
            <Button colorScheme="purple" variant="link">
              Sign up
            </Button>
          </Text>
        </Stack>
      </Stack>
    </Center>
  )
}

export default WithHeader(LoginForm)
