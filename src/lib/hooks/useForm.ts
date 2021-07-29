import { useState } from 'react'
import { useForm } from 'react-hook-form'

const customUseForm = () => {
  const [hasFalseCredentials, setHasFalseCredentials] = useState(false)
  const useFormStuff = useForm()
  const { handleSubmit } = useFormStuff

  const performLogin = async (credentials) => {
    try {
      console.log(credentials)
      // fetchJson({
      //   url: '/api/sessions',
      //   method: 'post',
      //   headers: { 'Content-Type': 'application/json' },
      //   data: credentials,
      // })
    } catch (error) {
      console.error('An unexpected error happened:', error)
      setHasFalseCredentials(true)
    }
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
