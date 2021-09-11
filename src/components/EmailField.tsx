import React from 'react'
import useI18n from '../lib/hooks/useI18n'
import InputField from './InputField'
import { InputProps } from '@chakra-ui/react'
import { useFormContext } from '../lib/contexts/FormContext'

const EmailField = ({ ...rest }: InputProps) => {
  const { t } = useI18n()
  const { formState, register } = useFormContext()

  return (
    <InputField
      id="email"
      placeholder={t.email}
      error={formState.errors['email']}
      errorText={t.emailRuleFail}
      hookFormRegister={register('email', {
        required: true,
        pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
      })}
      {...rest}
    />
  )
}

export default EmailField
