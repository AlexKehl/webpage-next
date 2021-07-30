import Header from './Header'
import React from 'react'
import { FC } from 'react'

interface Props {
  children: React.ReactNode
}

// const WithHeader = (Component: FC): FC => (props: any) => (
//   <div>
//     <Header />
//     <Component {...props} />
//   </div>
// )

function WithHeader<T extends Props = Props>(
  WrappedComponent: React.ComponentType<T>
) {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component'

  const ComponentWithHeader = (props: Omit<T, keyof Props>) => {
    return (
      <div>
        <Header />
        <WrappedComponent {...(props as T)} />
      </div>
    )
  }

  ComponentWithHeader.displayName = `WithHeader(${displayName})`
  return ComponentWithHeader
}

export default WithHeader
