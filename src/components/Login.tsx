import React from 'react'
import {
  Text,
  Image,
  Center,
  Stack,
  Heading,
  Checkbox,
  Button,
} from '@chakra-ui/react'
import { Texts } from '../../src/constants/Texts'
import WithHeader from '../../src/components/HOC/WithHeader'
import Register from './Register'
import EmailField from './EmailField'
import PasswordField from './PasswordField'
import useLogin from '../lib/hooks/useLogin'

export const Login = () => {
  const {
    onSubmit,
    formState,
    register,
    onRegisterClose,
    onRegisterOpen,
    isRegisterOpen,
  } = useLogin()
  return (
    <Center h="100vh">
      <Stack boxShadow="xl" p="20" rounded="md">
        <Image alt="" src="/logo.jpg" maxW="170px" mb="8" mx="auto"></Image>
        <Heading as="h1"> Log in.</Heading>
        <Text fontSize="lg" color="gray.600">
          {Texts.pleaseLogIn}
        </Text>

        <form onSubmit={onSubmit}>
          <Stack my="4" spacing="6">
            <EmailField formState={formState} register={register} />
            <PasswordField formState={formState} register={register} />
            <Checkbox colorScheme="purple">{Texts.keepMeLoggedIn}</Checkbox>
            <Button size="lg" colorScheme="purple" type="submit">
              {Texts.login}
            </Button>
          </Stack>
        </form>

        <Stack justify="center" color="gray.600" spacing="3">
          <Text as="div" textAlign="center">
            <span>{Texts.doNotHaveAccount}</span>
            <Button
              colorScheme="purple"
              variant="link"
              onClick={onRegisterOpen}
            >
              {Texts.signUp}
            </Button>
          </Text>
        </Stack>
      </Stack>
      <Register isOpen={isRegisterOpen} onClose={onRegisterClose} />
    </Center>
  )
}

export default WithHeader(Login)
