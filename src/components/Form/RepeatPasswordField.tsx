import { InputProps } from '@chakra-ui/react'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import useI18n from '../../lib/hooks/useI18n'
import InputField from './InputField'

type Props = {
  arePasswordsMatching: (passwordRepeat: string) => boolean
} & InputProps

const RepeatPasswordField = ({ arePasswordsMatching, ...rest }: Props) => {
  const { t } = useI18n()
  const { formState, register } = useFormContext()
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
