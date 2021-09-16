import React from 'react'
import {
  Text,
  Image,
  Center,
  Heading,
  Checkbox,
  Button,
  Stack,
} from '@chakra-ui/react'
import WithHeader from '../../src/components/HOC/WithHeader'
import Register from './Register'
import EmailField from './EmailField'
import PasswordField from './PasswordField'
import useLogin from '../lib/hooks/useLogin'
import useI18n from '../lib/hooks/useI18n'
import { FormContextProvider } from '../lib/contexts/FormContext'

export const Login = () => {
  const {
    performLogin,
    formState,
    register,
    onRegisterClose,
    onRegisterOpen,
    isRegisterOpen,
  } = useLogin()
  const { t } = useI18n()
  return (
    <Center my="auto">
      <Stack p={{ base: 10, sm: 20 }} rounded="md" w="xl">
        <Image alt="" src="/logo.jpg" maxW="170px" mb="8" mx="auto"></Image>
        <Heading as="h1"> Log in.</Heading>
        <Text fontSize="lg" color="gray.600">
          {t.pleaseLogIn}
        </Text>

        <form onSubmit={performLogin}>
          <Stack my="4" spacing="6">
            <FormContextProvider value={{ formState, register }}>
              <EmailField />
              <PasswordField />
              <Checkbox colorScheme="purple">{t.keepMeLoggedIn}</Checkbox>
            </FormContextProvider>
            <Button size="lg" colorScheme="purple" type="submit">
              {t.login}
            </Button>
          </Stack>
        </form>

        <Stack justify="center" color="gray.600" spacing="3">
          <Text as="div" textAlign="center">
            <span>{t.doNotHaveAccount}</span>
            <Button
              colorScheme="purple"
              variant="link"
              onClick={onRegisterOpen}
            >
              {t.signUp}
            </Button>
          </Text>
        </Stack>
      </Stack>
      <Register isOpen={isRegisterOpen} onClose={onRegisterClose} />
    </Center>
  )
}

export default WithHeader(Login)
