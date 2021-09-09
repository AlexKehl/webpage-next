import React from 'react'
import { FieldValues, FormState, UseFormRegister } from 'react-hook-form'
import useI18n from '../lib/hooks/useI18n'
import InputField from './InputField'

interface Props {
  register: UseFormRegister<FieldValues>
  formState: FormState<FieldValues>
}

const EmailField = ({ register, formState }: Props) => {
  const { t } = useI18n()

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
    />
  )
}

export default EmailField
