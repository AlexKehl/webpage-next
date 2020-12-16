import { Fragment } from 'react'
import Button from '@material-ui/core/Button'
import useLogout from './UseLogout'

const UserPanel = () => {
  const { performLogout } = useLogout()

  return (
    <Fragment>
      <Button variant="text" size="small">
        Admin panel
      </Button>
      <Button variant="outlined" size="small" onClick={performLogout}>
        Log out
      </Button>
    </Fragment>
  )
}

export default UserPanel
