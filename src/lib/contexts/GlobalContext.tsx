import React, { createContext } from 'react'
import useLoader from '../hooks/useLoader'
import useRedirect from '../hooks/useRedirect'
import useToasts from '../hooks/useToasts'

const GlobalContext = createContext({})

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  useToasts()
  useLoader()
  useRedirect()
  return <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>
}
