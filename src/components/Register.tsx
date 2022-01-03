import { Button, Center, Heading, Stack, Image } from '@chakra-ui/react'
import React from 'react'
import EmailField from './EmailField'
import PasswordField from './PasswordField'
import RepeatPasswordField from './RepeatPasswordField'
import useI18n from '../lib/hooks/useI18n'
import { FormProvider, useForm } from 'react-hook-form'
import { useRegisterMutation } from '../redux/services/serverApi'
import { RegisterDto } from 'common/interface/Dto'

const Register = () => {
  const { t } = useI18n()
  const formData = useForm()
  const [registerMutation] = useRegisterMutation()

  const arePasswordsMatching = (passwordRepeat: string) => {
    return passwordRepeat === formData.getValues()['password']
  }

  const register = (data: RegisterDto) => {
    registerMutation(data)
  }

  return (
    <Center my="auto">
      <Stack p={{ base: 10, sm: 20 }} rounded="md" w="xl">
        <Image alt="" src="/logo.jpg" maxW="170px" mb="8" mx="auto"></Image>
        <Heading as="h1">{t.createAccount}</Heading>
        <form onSubmit={formData.handleSubmit(register)}>
          <Stack my="4" spacing="2">
            <FormProvider {...formData}>
              <EmailField my="1" />
              <PasswordField my="1" />
              <RepeatPasswordField
                my="1"
                arePasswordsMatching={arePasswordsMatching}
              />
            </FormProvider>

            <Button colorScheme="purple" size="lg" type="submit">
              {t.create}
            </Button>
          </Stack>
        </form>
      </Stack>
    </Center>
  )
}

// <ConfirmEmail onClose={onConfirmEmailClose} isOpen={isConfirmEmailOpen} /> TODO do this

export default Register
