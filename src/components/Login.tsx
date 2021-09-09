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

export const Login = () => {
  const {
    onSubmit,
    formState,
    register,
    onRegisterClose,
    onRegisterOpen,
    isRegisterOpen,
  } = useLogin()
  const { t } = useI18n()
  return (
    <Center h="100vh">
      <Stack boxShadow="xl" p="20" rounded="md">
        <Image alt="" src="/logo.jpg" maxW="170px" mb="8" mx="auto"></Image>
        <Heading as="h1"> Log in.</Heading>
        <Text fontSize="lg" color="gray.600">
          {t.pleaseLogIn}
        </Text>

        <form onSubmit={onSubmit}>
          <Stack my="4" spacing="6">
            <EmailField formState={formState} register={register} />
            <PasswordField formState={formState} register={register} />
            <Checkbox colorScheme="purple">{t.keepMeLoggedIn}</Checkbox>
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
