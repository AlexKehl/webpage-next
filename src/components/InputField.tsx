import { Input, InputProps, Text } from '@chakra-ui/react'
import React from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

type Props = {
  error: boolean
  errorText: string
  hookFormRegister: ReturnType<UseFormRegister<FieldValues>>
} & InputProps

const InputField = ({ error, errorText, hookFormRegister, ...rest }: Props) => {
  return (
    <div>
      <Input isInvalid={error} {...rest} {...hookFormRegister} />
      {error && (
        <Text fontSize="small" color="red.500">
          {errorText}
        </Text>
      )}
    </div>
  )
}

export default InputField
