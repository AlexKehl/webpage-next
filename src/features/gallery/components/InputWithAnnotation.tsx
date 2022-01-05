import { Stack, FormLabel, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { FieldValues, useFormContext, UseFormRegister } from 'react-hook-form'
import InputField from 'src/components/Form/InputField'
import useI18n from 'src/lib/hooks/useI18n'

interface Props {
  label: string
  annotation: string
  hookFormRegister: ReturnType<UseFormRegister<FieldValues>>
}

const InputWithAnnotation = ({
  label,
  annotation,
  hookFormRegister,
}: Props) => {
  const { t } = useI18n()
  const { formState } = useFormContext()
  return (
    <Stack>
      <FormLabel m="0">{label}</FormLabel>
      <Flex m="0">
        <InputField
          error={formState.errors[hookFormRegister.name]}
          errorText={t.fieldRequired}
          hookFormRegister={hookFormRegister}
          width={16}
          type="number"
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
