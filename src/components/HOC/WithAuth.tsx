import { Center } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import useI18n from 'src/lib/hooks/useI18n'
import FullPageLoader from '../FullPageLoader'

function HOC<T>(Component: (props: T) => JSX.Element) {
  const WithAuth = (props: T) => {
    const { t } = useI18n()
    const { status } = useSession()

    if (status === 'loading') {
      return <FullPageLoader isLoading />
    }

    if (status === 'unauthenticated') {
      return <Center my="auto">{t.loginToViewContent}</Center>
    }

    return <Component {...props} />
  }
  return WithAuth
}

export default HOC
