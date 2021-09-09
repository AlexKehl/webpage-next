import React from 'react'
import { FieldValues, FormState, UseFormRegister } from 'react-hook-form'
import useI18n from '../lib/hooks/useI18n'
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
  const { t } = useI18n()
  return (
    <InputField
      id="repeatpassword"
      my="2"
      type="password"
      placeholder={t.repeatPassword}
      error={formState.errors['repeatpassword']}
      errorText={t.passwordsDoNotMatch}
      hookFormRegister={register('repeatpassword', {
        required: true,
        minLength: 8,
        validate: arePasswordsMatching,
      })}
    />
  )
}

export default RepeatPasswordField
