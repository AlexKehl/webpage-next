import { InputProps } from '@chakra-ui/react'
import React from 'react'
import { FieldValues, FormState, UseFormRegister } from 'react-hook-form'
import useI18n from '../lib/hooks/useI18n'
import InputField from './InputField'

type Props = {
  register: UseFormRegister<FieldValues>
  formState: FormState<FieldValues>
} & InputProps

const PasswordField = ({ register, formState, ...rest }: Props) => {
  const { t } = useI18n()
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
