import React from 'react'
import { FieldValues, FormState, UseFormRegister } from 'react-hook-form'
import { Texts } from '../constants/Texts'
import InputField from './InputField'

interface Props {
  register: UseFormRegister<FieldValues>
  formState: FormState<FieldValues>
}

const EmailField = ({ register, formState }: Props) => {
  return (
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
  )
}

export default EmailField
