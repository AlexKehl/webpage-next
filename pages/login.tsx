import React from 'react'
import LoginForm from '../src/components/LoginForm'
import { useForm } from '../src/lib/hooks/useForm'

export const Login = () => {
  const { handleSubmit, hasFalseCredentials, register, formState } = useForm()
  const email = register('email', {
    required: true,
    pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
  })
  const password = register('password', {
    minLength: 3,
    required: true,
  })
  console.log(formState)
  return (
    <div className="container">
      <LoginForm
        onSubmit={handleSubmit}
        hasFalseCredentials={hasFalseCredentials}
        errors={formState.errors}
        email={email}
        password={password}
      />
    </div>
  )
}

export default Login
