import { InputProps } from '@chakra-ui/react'
import React from 'react'
import { FieldValues, FormState, UseFormRegister } from 'react-hook-form'
import useI18n from '../lib/hooks/useI18n'
import InputField from './InputField'

type Props = {
  register: UseFormRegister<FieldValues>
  formState: FormState<FieldValues>
  arePasswordsMatching: (passwordRepeat: string) => boolean
} & InputProps

const RepeatPasswordField = ({
  register,
  formState,
  arePasswordsMatching,
  ...rest
}: Props) => {
  const { t } = useI18n()
  return (
    <InputField
      id="repeatpassword"
      type="password"
      placeholder={t.repeatPassword}
      error={formState.errors['repeatpassword']}
      errorText={t.passwordsDoNotMatch}
      hookFormRegister={register('repeatpassword', {
        required: true,
        minLength: 8,
        validate: arePasswordsMatching,
      })}
      {...rest}
    />
  )
}

export default RepeatPasswordField
