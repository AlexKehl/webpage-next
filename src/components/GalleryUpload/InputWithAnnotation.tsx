import { Stack, FormLabel, Flex, Input, Text } from '@chakra-ui/react'
import React, { ChangeEventHandler } from 'react'

interface Props {
  id: string
  label: string
  defaultValue?: number | string
  onChange: ChangeEventHandler<any>
  annotation: string
}

const InputWithAnnotation = ({
  id,
  label,
  defaultValue,
  onChange,
  annotation,
}: Props) => {
  return (
    <Stack>
      <FormLabel m="0">{label}</FormLabel>
      <Flex m="0">
        <Input
          id={id}
          width={16}
          type="number"
          defaultValue={defaultValue}
          onChange={onChange}
          mx="1"
          mb="1"
        />
        <Text alignSelf="flex-end" fontSize="md">
          {annotation}
        </Text>
      </Flex>
    </Stack>
  )
}

export default InputWithAnnotation
