import { Fragment } from 'react'
import HeaderButton from '../HeaderButton'
import { useRouter } from 'next/router'
import useUser from '../../lib/hooks/useUser.js'
import fetchJson from '../../lib/fetchJson'

const UserPanel = () => {
  const { user, mutateUser } = useUser()
  const router = useRouter()

  return (
    <Fragment>
      {!user?.isLoggedIn ? (
        <HeaderButton
          variant="outlined"
          size="small"
          onClick={() => router.push('login')}
        >
          Sign up
        </HeaderButton>
      ) : (
        <Fragment>
          <HeaderButton
            onClick={() => router.push('adminpanel')}
            variant="text"
            size="small"
          >
            Admin panel
          </HeaderButton>
          <HeaderButton
            variant="outlined"
            size="small"
            onClick={() => mutateUser(fetchJson('/api/logout'))}
          >
            Log out
          </HeaderButton>
        </Fragment>
      )}
    </Fragment>
  )
}

export default UserPanel
