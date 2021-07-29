import React, { FC, FormEventHandler } from 'react'
import {
  DeepMap,
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormRegisterReturn,
} from 'react-hook-form'
import InputField from './InputField'

interface Props {
  onSubmit: FormEventHandler<HTMLFormElement>
  hasFalseCredentials: boolean
  errors: DeepMap<FieldValues, FieldErrors>
  email: UseFormRegisterReturn
  password: UseFormRegisterReturn
}

const SignIn: FC<Props> = ({
  onSubmit,
  hasFalseCredentials,
  errors,
  email,
  password,
}) => {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <form
        onSubmit={onSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <InputField
          label="Email"
          type="text"
          id="email"
          error={Boolean(errors.email)}
          errorText="Enter valid email"
          register={email}
        />
        <InputField
          label="Password"
          type="password"
          id="password"
          error={Boolean(errors.password)}
          errorText="Password must be long enough"
          register={password}
        />
        <div className="flex items-center justify-between">
          <input
            type="submit"
            value="Sign In"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          />
        </div>
      </form>
    </div>
  )
}

export default SignIn
