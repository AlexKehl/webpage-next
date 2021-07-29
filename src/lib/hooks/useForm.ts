import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { API } from '../../../config'
import { Credentials } from '../../types'

const customUseForm = () => {
  const [hasFalseCredentials, setHasFalseCredentials] = useState(false)
  const useFormProps = useForm()
  const { push } = useRouter()

  const performLogin = async (credentials: Credentials) => {
    try {
      await axios({
        url: `${API}/login`,
        method: 'post',
        data: credentials,
        withCredentials: true,
      })
      push('/')
    } catch (error) {
      console.error('An unexpected error happened:', error)
      setHasFalseCredentials(true)
    }
  }

  return {
    performLogin,
    setHasFalseCredentials,
    hasFalseCredentials,
    ...useFormProps,
    handleSubmit: useFormProps.handleSubmit(performLogin),
  }
}

export { customUseForm as useForm }
