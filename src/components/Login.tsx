import {
  Button,
  Center,
  Checkbox,
  Heading,
  Image,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { LoginDto } from '../../common/interface/Dto'
import useI18n from '../lib/hooks/useI18n'
import useLoader from '../lib/hooks/useLoader'
import useLocalStorage from '../lib/hooks/useLocalStorage'
import useRedirect from '../lib/hooks/useRedirect'
import useToasts from '../lib/hooks/useToasts'
import { useLazyLoginQuery } from '../redux/services/serverApi'
import { userSelector } from '../redux/slices/userSlice'
import EmailField from './EmailField'
import PasswordField from './PasswordField'
import Register from './Register'

export const Login = () => {
  // const {
  //   performLogin,
  //   onRegisterClose,
  //   onRegisterOpen,
  //   isRegisterOpen,
  //   formData,
  // } = useLogin()

  const formData = useForm()
  const { t } = useI18n()

  const {
    isOpen: isRegisterOpen,
    onOpen: onRegisterOpen,
    onClose: onRegisterClose,
  } = useDisclosure()

  const [loginQuery] = useLazyLoginQuery()

  useToasts(userSelector)
  useLoader(userSelector)
  useLocalStorage(userSelector, 'user')
  useRedirect(userSelector)

  const performLogin = (data: LoginDto) => {
    return loginQuery(data)
  }

  return (
    <Center my="auto">
      <Stack p={{ base: 10, sm: 20 }} rounded="md" w="xl">
        <Image alt="" src="/logo.jpg" maxW="170px" mb="8" mx="auto"></Image>
        <Heading as="h1"> Log in.</Heading>
        <Text fontSize="lg" color="gray.600">
          {t.pleaseLogIn}
        </Text>

        <form onSubmit={formData.handleSubmit(performLogin)}>
          <Stack my="4" spacing="6">
            <FormProvider {...formData}>
              <EmailField />
              <PasswordField />
              <Checkbox colorScheme="purple">{t.keepMeLoggedIn}</Checkbox>
            </FormProvider>
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

export default Login
