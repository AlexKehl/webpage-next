import { useState } from 'react'
import { useForm } from 'react-hook-form'
import useUser from '../../lib/hooks/useUser.js'
import fetchJson from '../../lib/fetchJson'

const customUseForm = () => {
  const { mutateUser } = useUser({
    redirectTo: '/',
    redirectIfFound: true,
  })
  const [hasFalseCredentials, setHasFalseCredentials] = useState(false)
  const useFormStuff = useForm()
  const { handleSubmit } = useFormStuff

  const performLogin = async (credentials) => {
    try {
      await mutateUser(
        fetchJson({
          url: '/api/sessions',
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          data: credentials,
        })
      )
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
