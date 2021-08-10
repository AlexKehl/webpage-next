import React, { ChangeEventHandler, FormEventHandler, useState } from 'react'
import LoginView from './LoginView'
import useUser from '../../src/lib/hooks/useUser'
import { LoginDto } from '../../common/interface/Dto'

export const Login = () => {
  const [formData, setFormData] = useState<LoginDto>({
    email: '',
    password: '',
  })
  const { hasFalseCredentials, performLogin } = useUser()

  const updateFormData: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const onFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    performLogin(formData)
  }

  return (
    <LoginView
      onSubmit={onFormSubmit}
      hasFalseCredentials={hasFalseCredentials}
      updateFormData={updateFormData}
    />
  )
}

export default Login
