import { InputProps } from '@chakra-ui/react'
import React from 'react'
import { useFormContext } from '../lib/contexts/FormContext'
import useI18n from '../lib/hooks/useI18n'
import InputField from './InputField'

const PasswordField = ({ ...rest }: InputProps) => {
  const { t } = useI18n()
  const { formState, register } = useFormContext()
  return (
    <InputField
      id="password"
      type="password"
      placeholder={t.password}
      error={formState.errors['password']}
      errorText={t.passwordRuleFail}
      hookFormRegister={register('password', {
        required: true,
        minLength: 8,
      })}
      {...rest}
    />
  )
}

export default PasswordField
