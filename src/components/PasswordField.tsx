import React from 'react'
import { FieldValues, FormState, UseFormRegister } from 'react-hook-form'
import useI18n from '../lib/hooks/useI18n'
import InputField from './InputField'

interface Props {
  register: UseFormRegister<FieldValues>
  formState: FormState<FieldValues>
}

const PasswordField = ({ register, formState }: Props) => {
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
    />
  )
}

export default PasswordField
