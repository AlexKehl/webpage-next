import {
  Button,
  Center,
  Checkbox,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react'
import router from 'next/router'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { LoginDto } from '../../common/interface/Dto'
import useI18n from '../lib/hooks/useI18n'
import { useLazyLoginQuery } from '../redux/services/serverApi'
import EmailField from './EmailField'
import PasswordField from './PasswordField'

export const Login = () => {
  const formData = useForm()
  const { t } = useI18n()
  const [loginQuery] = useLazyLoginQuery()

  const onLoginHandler = (data: LoginDto) => {
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

        <form onSubmit={formData.handleSubmit(onLoginHandler)}>
          <Stack my="4" spacing="4">
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
              onClick={() => router.push('/register')}
            >
              {t.signUp}
            </Button>
          </Text>
        </Stack>
      </Stack>
    </Center>
  )
}

export default Login
