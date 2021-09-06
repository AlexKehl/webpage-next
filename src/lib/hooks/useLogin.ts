import { useDisclosure } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { LoginDto } from '../../../common/interface/Dto'
import useUser from './useUser'

const useLogin = () => {
  const { register, handleSubmit, formState } = useForm()

  const {
    isOpen: isRegisterOpen,
    onOpen: onRegisterOpen,
    onClose: onRegisterClose,
  } = useDisclosure()

  const { performLogin } = useUser()

  const onSubmit = (data: LoginDto) => {
    performLogin(data)
  }

  return {
    onSubmit: handleSubmit(onSubmit),
    formState,
    register,
    onRegisterOpen,
    onRegisterClose,
    isRegisterOpen,
  }
}

export default useLogin
