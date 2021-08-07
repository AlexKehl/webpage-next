import React, { FC, FormEventHandler } from 'react'
import {
  DeepMap,
  FieldErrors,
  FieldValues,
  UseFormRegisterReturn,
} from 'react-hook-form'
import { joinClasses } from '../../src/utils/TailWind'
import Alert from '../../src/components/Alert'
import WithHeader from '../../src/components/HOC/WithHeader'
import InputField from '../../src/components/InputField'

interface Props {
  onSubmit: FormEventHandler<HTMLFormElement>
  hasFalseCredentials: boolean
  errors: DeepMap<FieldValues, FieldErrors>
  email: UseFormRegisterReturn
  password: UseFormRegisterReturn
}

const LoginForm: FC<Props> = ({
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
        className="bg-white shadow-md rounded w-96 px-8 pt-6 pb-8 mb-4"
      >
        <InputField
          placeholder="Email"
          type="text"
          id="email"
          error={Boolean(errors.email)}
          errorText="Enter valid email"
          register={email}
        />
        <InputField
          type="password"
          id="password"
          placeholder="Password"
          error={Boolean(errors.password)}
          errorText="Password must be long enough"
          register={password}
        />

        {hasFalseCredentials && <Alert text={'Wrong credentials entered'} />}

        <div className="flex items-center justify-between">
          <input
            type="submit"
            value="Sign In"
            className={joinClasses([
              'bg-blue-500',
              'hover:bg-blue-700',
              'text-white',
              'font-bold',
              'py-2',
              'px-4',
              'rounded',
              'focus:outline-none',
              'focus:shadow-outline',
              'w-full',
            ])}
          />
        </div>
        <div className="border-t mt-4 text-center">
          <span className="bg-white px-2 relative -top-3.5 text-gray-400">
            or
          </span>
        </div>

        <div className="flex items-center justify-between">
          <input
            onClick={() => alert('hi')}
            type="button"
            value="Register"
            className={joinClasses([
              'bg-gray-500',
              'hover:bg-gray-700',
              'text-white',
              'font-bold',
              'py-2',
              'px-4',
              'rounded',
              'focus:outline-none',
              'focus:shadow-outline',
              'w-full',
            ])}
          />
        </div>
      </form>
    </div>
  )
}

export default WithHeader(LoginForm)
