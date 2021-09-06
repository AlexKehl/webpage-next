import React from 'react'
import { FieldValues, FormState, UseFormRegister } from 'react-hook-form'
import { Texts } from '../constants/Texts'
import InputField from './InputField'

interface Props {
  register: UseFormRegister<FieldValues>
  formState: FormState<FieldValues>
}

const PasswordField = ({ register, formState }: Props) => {
  return (
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
  )
}

export default PasswordField
