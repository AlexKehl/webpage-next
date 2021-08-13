import React, { ChangeEventHandler, FormEventHandler, useState } from 'react'
import useUser from '../../src/lib/hooks/useUser'
import { LoginDto } from '../../common/interface/Dto'
import {
  Text,
  Image,
  Center,
  Stack,
  Heading,
  Input,
  Alert,
  Checkbox,
  Button,
} from '@chakra-ui/react'
import { Texts } from '../../src/constants/Texts'

export const Login = () => {
  const [formData, setFormData] = useState<LoginDto>({
    email: '',
    password: '',
  })
  const { hasFalseCredentials, performLogin } = useUser()

  const updateFormData: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    performLogin(formData)
  }

  return (
    <Center h="100vh">
      <Stack boxShadow="xl" p="20" rounded="md">
        <Image src="/logo.jpg" maxW="170px" mb="8" mx="auto"></Image>
        <Heading as="h1"> Log in.</Heading>
        <Text fontSize="lg" color="gray.600">
          {Texts.pleaseLogIn}
        </Text>

        <form onSubmit={onSubmit}>
          <Stack my="4" spacing="6">
            <Input
              id="email"
              type="email"
              placeholder={Texts.email}
              onChange={updateFormData}
            />
            <Input
              id="password"
              type="password"
              placeholder={Texts.password}
              onChange={updateFormData}
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
            <Button colorScheme="purple" variant="link">
              {Texts.signUp}
            </Button>
          </Text>
        </Stack>
      </Stack>
    </Center>
  )
}

export default Login
