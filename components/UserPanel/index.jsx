import { Fragment } from 'react'
import useLogout from './UseLogout'
import HeaderButton from '../HeaderButton'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'

const UserPanel = () => {
  const { performLogout } = useLogout()
  const [cookies] = useCookies(['cookie-name'])
  const router = useRouter()

  return (
    <Fragment>
      {!cookies.hasActiveToken ? (
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
          <HeaderButton variant="outlined" size="small" onClick={performLogout}>
            Log out
          </HeaderButton>
        </Fragment>
      )}
    </Fragment>
  )
}

export default UserPanel
