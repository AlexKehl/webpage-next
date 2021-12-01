import { InputProps } from '@chakra-ui/react'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import useI18n from '../../lib/hooks/useI18n'
import InputField from '../InputField'

const Phone = ({ ...rest }: InputProps) => {
  const { t } = useI18n()
  const { formState, register } = useFormContext()

  return (
    <InputField
      id="phone"
      placeholder={t.phone}
      error={formState.errors['phone']}
      errorText={t.fieldRequired}
      hookFormRegister={register('phone', { required: true })}
      {...rest}
    />
  )
}

export default Phone
