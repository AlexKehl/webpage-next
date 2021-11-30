import { InputProps } from '@chakra-ui/react'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import useI18n from '../../lib/hooks/useI18n'
import InputField from '../InputField'

const FirstName = ({ ...rest }: InputProps) => {
  const { t } = useI18n()
  const { formState, register } = useFormContext()

  return (
    <InputField
      id="lastName"
      placeholder={t.firstName}
      error={formState.errors['firstName']}
      errorText={t.fieldRequired}
      hookFormRegister={register('firstName', { required: true })}
      {...rest}
    />
  )
}

export default FirstName
