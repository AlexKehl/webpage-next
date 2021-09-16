import { User } from '../../../common/interface/ConsumerResponses'
import { deleteItem, getItem, setItem } from '../utils/LocalStorage'
import { useState } from 'react'

const useUser = () => {
  const [user, setUserState] = useState<User | undefined>(getItem('user'))

  const getUser = () => {
    return user
  }

  const isLoggedIn = Boolean(getUser())

  const setUser = (user: User) => {
    setItem('user', user)
    setUserState(user)
  }

  const deleteUser = () => {
    deleteItem('user')
    setUserState(undefined)
  }

  return {
    user,
    isLoggedIn,
    getUser,
    setUser,
    deleteUser,
  }
}

export default useUser
