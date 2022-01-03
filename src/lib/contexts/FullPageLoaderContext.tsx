import React, { createContext, useContext, useState } from 'react'
import FullPageLoader from 'src/components/FullPageLoader'

interface FullPageLoaderContext {
  isLoading: boolean
  setIsLoading: (val: boolean) => void
}

const FullPageLoaderContext = createContext<FullPageLoaderContext>({
  isLoading: false,
  setIsLoading: () => {},
})

export const FullPageLoaderContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <FullPageLoaderContext.Provider value={{ setIsLoading, isLoading }}>
      {isLoading && <FullPageLoader />}
      {children}
    </FullPageLoaderContext.Provider>
  )
}

export const useLoaderContext = () => {
  const context = useContext(FullPageLoaderContext)
  if (!context) {
    throw new Error('context must be used within a Provider')
  }
  return context
}
