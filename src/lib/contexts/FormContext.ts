import { UseFormRegister, FieldValues, FormState } from 'react-hook-form'
import { createGenericContext } from './Utils'

interface FormContext {
  register: UseFormRegister<FieldValues>
  formState: FormState<FieldValues>
}

const [useFormContext, FormContextProvider] =
  createGenericContext<FormContext>()

export { useFormContext, FormContextProvider }
