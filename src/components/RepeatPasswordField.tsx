import React from 'react'
import { FieldValues, FormState, UseFormRegister } from 'react-hook-form'
import { Texts } from '../constants/Texts'
import InputField from './InputField'

interface Props {
  register: UseFormRegister<FieldValues>
  formState: FormState<FieldValues>
  arePasswordsMatching: (passwordRepeat: string) => boolean
}

const RepeatPasswordField = ({
  register,
  formState,
  arePasswordsMatching,
}: Props) => {
  return (
    <InputField
      id="repeatpassword"
      my="2"
      type="password"
      placeholder={Texts.repeatPassword}
      error={formState.errors['repeatpassword']}
      errorText={Texts.passwordsDoNotMatch}
      hookFormRegister={register('repeatpassword', {
        required: true,
        minLength: 8,
        validate: arePasswordsMatching,
      })}
    />
  )
}

export default RepeatPasswordField
