import { useEffect } from 'react'
import Router from 'next/router'

export default function useUser({
  redirectTo = '',
  redirectIfFound = false,
} = {}) {
  // const { data: user, mutate: mutateUser } = useSWR('/api/sessions', fetchJson)
  const user = { isLoggedIn: false }
  const mutateUser = () => true

  useEffect(() => {
    if (!redirectTo || !user) {
      return
    }
    if (
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      (redirectIfFound && user?.isLoggedIn)
    ) {
      Router.push(redirectTo)
    }
  }, [user, redirectIfFound, redirectTo])

  return { user, mutateUser }
}
