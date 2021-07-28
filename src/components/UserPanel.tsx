import React, { FC, Fragment } from 'react'
import { useRouter } from 'next/router'
import useI18n from '../lib/hooks/useI18n'
import useUser from '../lib/hooks/useUser'
import HeaderButton from './HeaderButton'

const UserPanel: FC = () => {
  const { user, mutateUser } = useUser()
  const router = useRouter()
  const { i18n } = useI18n()

  return (
    <Fragment>
      {!user?.isLoggedIn ? (
        <HeaderButton
          variant="outlined"
          size="small"
          onClick={() => router.push('/login')}
        >
          {i18n.signUp}
        </HeaderButton>
      ) : (
        <Fragment>
          <HeaderButton
            onClick={() => router.push('/adminpanel')}
            variant="text"
            size="small"
          >
            Admin panel
          </HeaderButton>
          <HeaderButton
            variant="outlined"
            size="small"
            onClick={() => mutateUser(/* '/api/logout' */)}
          >
            Log out
          </HeaderButton>
        </Fragment>
      )}
    </Fragment>
  )
}

export default UserPanel
