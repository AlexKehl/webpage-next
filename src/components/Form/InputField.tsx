import { Input, InputProps, Text } from '@chakra-ui/react'
import React, { Fragment } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

type Props = {
  error: boolean
  errorText: string
  hookFormRegister: ReturnType<UseFormRegister<FieldValues>>
} & InputProps

const InputField = ({ error, errorText, hookFormRegister, ...rest }: Props) => {
  return (
    <Fragment>
      <Input isInvalid={error} {...rest} {...hookFormRegister} />
      {error && (
        <Text mx="2" my="1" textAlign="left" fontSize="small" color="red.500">
          {errorText}
        </Text>
      )}
    </Fragment>
  )
}

export default InputField