import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { hasValidCredentials } from 'components/LoginForm/auth'
import { useRouter } from 'next/router'
import { Credentials } from 'types/'

const customUseForm = () => {
  const [loginFail, setLoginFail] = useState(false)
  const useFormStuff = useForm()
  const { handleSubmit } = useFormStuff
  const router = useRouter()

  const performLogin = async (credentials: Credentials) => {
    const res = await hasValidCredentials(credentials)
    if (res) {
      router.push('/')
    }
    setLoginFail(res)
  }

  return {
    setLoginFail,
    loginFail,
    ...useFormStuff,
    handleSubmit: handleSubmit(performLogin),
  }
}

export { customUseForm as useForm }
