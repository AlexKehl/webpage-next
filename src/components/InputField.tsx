import { FC } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface Props {
  label: string
  error: boolean
  errorText: string
  id: string
  type: string
  placeholder?: string
  register?: UseFormRegisterReturn
}
const InputField: FC<Props> = ({
  id,
  type,
  placeholder,
  register,
  errorText,
  error,
  label,
}) => {
  const normalFieldStateCss =
    'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
  const errorFieldStateCss = error
    ? `${normalFieldStateCss} border-red-500`
    : normalFieldStateCss
  return (
    <div>
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="username"
      >
        {label}
      </label>
      <input
        className={errorFieldStateCss}
        id={id}
        type={type}
        placeholder={placeholder}
        {...register}
      />
      {error && <p className="text-red-500 text-xs italic">{errorText}</p>}
    </div>
  )
}

export default InputField
