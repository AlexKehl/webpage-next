import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { hasValidCredentials } from 'components/LoginForm/auth'
import { useRouter as useRouterDI } from 'next/router'
import { Credentials } from 'types/'

const customUseForm = (useRouter = useRouterDI) => {
  const [hasFalseCredentials, setHasFalseCredentials] = useState(false)
  const useFormStuff = useForm()
  const { handleSubmit } = useFormStuff
  const router = useRouter()

  const performLogin = async (credentials: Credentials) => {
    const res = await hasValidCredentials(credentials)
    if (res) {
      return router.push('/')
    }
    setHasFalseCredentials(true)
  }

  return {
    performLogin,
    setHasFalseCredentials,
    hasFalseCredentials,
    ...useFormStuff,
    handleSubmit: handleSubmit(performLogin),
  }
}

export { customUseForm as useForm }
