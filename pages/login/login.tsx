import React from 'react'
import { useForm } from 'react-hook-form'
import LoginForm from '../src/components/LoginForm'
import useUser from '../src/lib/hooks/useUser'

export const Login = () => {
  const { register, handleSubmit, formState } = useForm()
  const { hasFalseCredentials, performLogin } = useUser()
  const email = register('email', {
    required: true,
    pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
  })
  const password = register('password', {
    minLength: 3,
    required: true,
  })
  return (
    <LoginForm
      onSubmit={handleSubmit(performLogin)}
      hasFalseCredentials={hasFalseCredentials}
      errors={formState.errors}
      email={email}
      password={password}
    />
  )
}

export default Login
