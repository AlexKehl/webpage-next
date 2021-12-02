import React, { Fragment, useEffect, useState } from 'react'

function HOC<T>(Component: (props: T) => JSX.Element) {
  const WithClientRender = (props: T) => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
      setMounted(true)
    }, [])

    return <Fragment>{mounted && <Component {...props} />}</Fragment>
  }
  return WithClientRender
}

export default HOC
