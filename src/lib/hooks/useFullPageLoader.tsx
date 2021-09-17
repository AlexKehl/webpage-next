import React, { useState } from 'react'
import FullPageLoader from '../../components/FullPageLoader'

const useFullPageLoader = () => {
  const [isLoading, setIsLoading] = useState(false)

  return {
    setIsLoading,
    isLoading,
  }
}

export default useFullPageLoader
