import React from 'react'
import useUser from '../../src/lib/hooks/useUser'
import { LoginDto } from '../../common/interface/Dto'
import {
  Text,
  Image,
  Center,
  Stack,
  Heading,
  Alert,
  Checkbox,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import { Texts } from '../../src/constants/Texts'
import { useForm } from 'react-hook-form'
import WithHeader from '../../src/components/HOC/WithHeader'
import InputField from '../../src/components/InputField'
import Register from './Register'

export const Login = () => {
  const { register, handleSubmit, formState } = useForm()

  const {
    isOpen: isRegisterOpen,
    onOpen: onRegisterOpen,
    onClose: onRegisterClose,
  } = useDisclosure()

  const { performLogin, hasFalseCredentials } = useUser()

  const onSubmit = (data: LoginDto) => {
    performLogin(data)
  }
  return (
    <Center h="100vh">
      <Stack boxShadow="xl" p="20" rounded="md">
        <Image src="/logo.jpg" maxW="170px" mb="8" mx="auto"></Image>
        <Heading as="h1"> Log in.</Heading>
        <Text fontSize="lg" color="gray.600">
          {Texts.pleaseLogIn}
        </Text>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack my="4" spacing="6">
            <InputField
              id="email"
              placeholder={Texts.email}
              error={formState.errors['email']}
              errorText={Texts.emailRuleFail}
              hookFormRegister={register('email', {
                required: true,
                pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
              })}
            />
            <InputField
              id="password"
              type="password"
              placeholder={Texts.password}
              error={formState.errors['password']}
              errorText={Texts.passwordRuleFail}
              hookFormRegister={register('password', {
                required: true,
                minLength: 8,
              })}
            />
            {hasFalseCredentials && <Alert text={Texts.wrongCredentials} />}
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
