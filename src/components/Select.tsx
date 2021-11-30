import { Text, Select as ChakraSelect } from '@chakra-ui/react'
import React from 'react'
import { UseFormRegister, FieldValues } from 'react-hook-form'

type Props = {
  error: boolean
  errorText: string
  options: {
    value: string
    label: string
  }[]
  onChange: React.ReactEventHandler<HTMLSelectElement>
  hookFormRegister: ReturnType<UseFormRegister<FieldValues>>
}

const Select = ({ error, errorText, options, hookFormRegister }: Props) => {
  return (
    <div>
      <ChakraSelect {...hookFormRegister}>
        {options.map((option, idx) => (
          <option key={idx} value={option.value}>
            {option.label}
          </option>
        ))}
      </ChakraSelect>
      {error && (
        <Text mx="2" my="1" textAlign="left" fontSize="small" color="red.500">
          {errorText}
        </Text>
      )}
    </div>
  )
}

export default Select
